import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import type { LeadFormConfig } from "@/config/leadForm";

const configuredForm: LeadFormConfig = {
  policyUrl: "https://recoveryvsadu.ru/#policy",
  iframeName: "test-form-target",
  successMessage: "Заявка отправлена.",
  requestTimeoutMs: 3000,
  endpointUrl: "https://script.google.com/macros/s/test-script-id/exec",
  consentAcceptedValue: "Да, согласен(а)",
};

describe("LeadCaptureForm", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/?utm_source=telegram&utm_medium=social&utm_campaign=volunteer");
  });

  it("shows validation errors for empty required fields", async () => {
    render(<LeadCaptureForm config={configuredForm} />);

    fireEvent.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect(await screen.findByText("Укажите имя.")).toBeInTheDocument();
    expect(screen.getByText("Оставьте телефон или Telegram.")).toBeInTheDocument();
    expect(screen.getByText("Нужно согласие на обработку персональных данных.")).toBeInTheDocument();
  });

  it("submits through hidden iframe and shows success message", async () => {
    const submitSpy = vi
      .spyOn(HTMLFormElement.prototype, "submit")
      .mockImplementation(() => undefined);

    render(<LeadCaptureForm config={configuredForm} />);

    const iframe = screen.getByTitle("Отправка заявки");
    fireEvent.load(iframe);

    fireEvent.change(screen.getByLabelText("Имя"), {
      target: { value: "Даша" },
    });
    fireEvent.change(screen.getByLabelText("Телефон или Telegram"), {
      target: { value: "@dashaburova" },
    });
    fireEvent.change(screen.getByLabelText("Комментарий"), {
      target: { value: "Хочу попасть на ближайший выезд." },
    });
    fireEvent.click(screen.getByLabelText(/Я согласен\(а\) на обработку персональных данных/i));

    fireEvent.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Отправляем..." })).toBeDisabled();

    fireEvent.load(iframe);

    await waitFor(() => {
      expect(screen.getByText("Заявка отправлена.")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Имя")).toHaveValue("");
    expect(screen.getByLabelText("Телефон или Telegram")).toHaveValue("");
    expect(screen.getByLabelText("Комментарий")).toHaveValue("");

    submitSpy.mockRestore();
  });
});
