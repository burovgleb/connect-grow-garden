import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import type { LeadFormConfig } from "@/config/leadForm";

const configuredForm: LeadFormConfig = {
  policyUrl: "https://recoveryvsadu.ru/#policy",
  successMessage: "Заявка отправлена.",
  requestTimeoutMs: 3000,
  endpointUrl: "https://script.google.com/macros/s/test-script-id/exec",
  consentAcceptedValue: "Да, согласен(а)",
};

describe("LeadCaptureForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.history.replaceState({}, "", "/?utm_source=telegram&utm_medium=social&utm_campaign=volunteer");
  });

  it("shows validation errors for empty required fields", async () => {
    render(<LeadCaptureForm config={configuredForm} />);

    fireEvent.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect(await screen.findByText("Укажите имя.")).toBeInTheDocument();
    expect(screen.getByText("Оставьте телефон или Telegram.")).toBeInTheDocument();
    expect(screen.getByText("Нужно согласие на обработку персональных данных.")).toBeInTheDocument();
  });

  it("submits through Apps Script and shows success message", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({} as Response);

    render(<LeadCaptureForm config={configuredForm} />);

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

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      configuredForm.endpointUrl,
      expect.objectContaining({
        method: "POST",
        mode: "no-cors",
        body: expect.any(URLSearchParams),
        signal: expect.any(AbortSignal),
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Заявка отправлена.")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Имя")).toHaveValue("");
    expect(screen.getByLabelText("Телефон или Telegram")).toHaveValue("");
    expect(screen.getByLabelText("Комментарий")).toHaveValue("");
  });

  it("keeps entered values and shows an error after a network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));

    render(<LeadCaptureForm config={configuredForm} />);

    fireEvent.change(screen.getByLabelText("Имя"), {
      target: { value: "Даша" },
    });
    fireEvent.change(screen.getByLabelText("Телефон или Telegram"), {
      target: { value: "@dashaburova" },
    });
    fireEvent.click(screen.getByLabelText(/Я согласен\(а\) на обработку персональных данных/i));
    fireEvent.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect(
      await screen.findByText("Не удалось отправить заявку, попробуйте ещё раз."),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Имя")).toHaveValue("Даша");
    expect(screen.getByLabelText("Телефон или Telegram")).toHaveValue("@dashaburova");
  });
});
