import { useEffect, useMemo, useRef, useState } from "react";

import { leadFormConfig, isLeadFormConfigured, type LeadFormConfig } from "@/config/leadForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface LeadCaptureFormProps {
  config?: LeadFormConfig;
}

interface LeadFormValues {
  name: string;
  contact: string;
  comment: string;
  consent: boolean;
  company: string;
}

type LeadFormErrors = Partial<Record<"name" | "contact" | "consent", string>>;

const initialValues: LeadFormValues = {
  name: "",
  contact: "",
  comment: "",
  consent: false,
  company: "",
};

const getUtmParams = () => {
  if (typeof window === "undefined") {
    return {
      pageUrl: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    pageUrl: window.location.href,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
};

const validateLeadForm = (values: LeadFormValues): LeadFormErrors => {
  const errors: LeadFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Укажите имя.";
  }

  if (!values.contact.trim()) {
    errors.contact = "Оставьте телефон или Telegram.";
  }

  if (!values.consent) {
    errors.consent = "Нужно согласие на обработку персональных данных.";
  }

  return errors;
};

const LeadCaptureForm = ({ config = leadFormConfig }: LeadCaptureFormProps) => {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const awaitingSubmitRef = useRef(false);

  const isConfigured = isLeadFormConfigured(config);
  const utmParams = useMemo(() => getUtmParams(), []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clearFieldError = (field: keyof LeadFormErrors) => {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleTextChange =
    (field: "name" | "contact" | "comment" | "company") =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      if (field === "name" || field === "contact") {
        clearFieldError(field);
      }

      if (submitState === "success" || submitState === "error") {
        setSubmitState("idle");
        setFeedbackMessage("");
      }
    };

  const handleConsentChange = (checked: boolean) => {
    setValues((current) => ({
      ...current,
      consent: checked,
    }));
    clearFieldError("consent");

    if (submitState === "success" || submitState === "error") {
      setSubmitState("idle");
      setFeedbackMessage("");
    }
  };

  const handleIframeLoad = () => {
    if (!awaitingSubmitRef.current) {
      return;
    }

    awaitingSubmitRef.current = false;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setValues(initialValues);
    setErrors({});
    setSubmitState("success");
    setFeedbackMessage(config.successMessage);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "submitting") {
      return;
    }

    if (!isConfigured) {
      setSubmitState("error");
      setFeedbackMessage(
        "Форма пока не подключена к Apps Script endpoint. Заполните публичный конфиг перед публикацией.",
      );
      return;
    }

    if (values.company.trim()) {
      setSubmitState("idle");
      setFeedbackMessage("");
      return;
    }

    const nextErrors = validateLeadForm(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitState("idle");
      setFeedbackMessage("");
      return;
    }

    setErrors({});
    setSubmitState("submitting");
    setFeedbackMessage("");
    awaitingSubmitRef.current = true;

    timeoutRef.current = window.setTimeout(() => {
      if (!awaitingSubmitRef.current) {
        return;
      }

      awaitingSubmitRef.current = false;
      setSubmitState("error");
      setFeedbackMessage("Не удалось отправить заявку, попробуйте ещё раз.");
    }, config.requestTimeoutMs);

    formRef.current?.submit();
  };

  return (
    <div className="text-left">
      <iframe
        title="Отправка заявки"
        name={config.iframeName}
        className="hidden"
        onLoad={handleIframeLoad}
      />

      <form
        ref={formRef}
        action={config.endpointUrl || undefined}
        method="POST"
        target={config.iframeName}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div
          className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={handleTextChange("company")}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="lead-name" className="text-[0.68rem] font-light uppercase tracking-[0.24em] text-foreground/58">
              Имя
            </Label>
            <Input
              id="lead-name"
              name="name"
              value={values.name}
              onChange={handleTextChange("name")}
              placeholder="Как к вам обращаться"
              autoComplete="name"
              className={cn(
                "border-foreground/10 bg-background/82 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
                errors.name && "border-destructive focus-visible:ring-destructive",
              )}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
            />
            {errors.name ? (
              <p id="lead-name-error" className="text-sm font-light text-foreground/70">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-contact" className="text-[0.68rem] font-light uppercase tracking-[0.24em] text-foreground/58">
              Телефон или Telegram
            </Label>
            <Input
              id="lead-contact"
              name="contact"
              value={values.contact}
              onChange={handleTextChange("contact")}
              placeholder="+7... или @username"
              autoComplete="tel"
              className={cn(
                "border-foreground/10 bg-background/82 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
                errors.contact && "border-destructive focus-visible:ring-destructive",
              )}
              aria-invalid={Boolean(errors.contact)}
              aria-describedby={errors.contact ? "lead-contact-error" : undefined}
            />
            {errors.contact ? (
              <p id="lead-contact-error" className="text-sm font-light text-foreground/70">
                {errors.contact}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-comment" className="text-[0.68rem] font-light uppercase tracking-[0.24em] text-foreground/58">
            Комментарий
          </Label>
          <Textarea
            id="lead-comment"
            name="comment"
            value={values.comment}
            onChange={handleTextChange("comment")}
            placeholder="Можно коротко рассказать о себе, вопросе или удобном формате связи"
            className="min-h-[140px] border-foreground/10 bg-background/82 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
          />
        </div>

        <div className="rounded-[1.5rem] border border-foreground/8 bg-background/70 p-5">
          <div className="flex items-start gap-3">
            <Checkbox
              id="lead-consent"
              checked={values.consent}
              onCheckedChange={(checked) => handleConsentChange(checked === true)}
              className={cn(
                "mt-1 border-foreground/28 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                errors.consent && "border-destructive",
              )}
              aria-invalid={Boolean(errors.consent)}
            />
            <div className="space-y-2">
              <Label htmlFor="lead-consent" className="text-sm font-light leading-[1.75] text-foreground/80">
                Я согласен(а) на обработку персональных данных и принимаю{" "}
                <a
                  href={config.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  политику проекта
                </a>
                .
              </Label>
              {errors.consent ? (
                <p className="text-sm font-light text-foreground/70">{errors.consent}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-light leading-[1.75] text-foreground/62">
            После отправки заявка сохранится в рабочем реестре, а команда получит уведомление
            в Telegram.
          </p>

          {submitState === "success" ? (
            <div className="rounded-[1.4rem] border border-foreground/10 bg-background/82 px-4 py-3 text-sm font-light leading-[1.75] text-foreground/88">
              {feedbackMessage}
            </div>
          ) : null}

          {submitState === "error" ? (
            <div className="rounded-[1.4rem] border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm font-light leading-[1.75] text-foreground/88">
              {feedbackMessage}
            </div>
          ) : null}

          {!isConfigured ? (
            <div className="rounded-[1.4rem] border border-foreground/10 bg-background/76 px-4 py-3 text-sm font-light leading-[1.75] text-foreground/74">
              Форма требует подключения Apps Script web app URL. Инструкция добавлена в
              README и `docs/lead-form-setup.md`.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={submitState === "submitting" || !isConfigured}
              className="h-auto px-10 py-6 disabled:opacity-60"
            >
              {submitState === "submitting" ? "Отправляем..." : "Отправить заявку"}
            </Button>
          </div>
        </div>

        {values.consent ? (
          <input
            type="hidden"
            name="consent"
            value={config.consentAcceptedValue}
          />
        ) : null}
        <input type="hidden" name="page_url" value={utmParams.pageUrl} />
        <input type="hidden" name="utm_source" value={utmParams.utmSource} />
        <input type="hidden" name="utm_medium" value={utmParams.utmMedium} />
        <input type="hidden" name="utm_campaign" value={utmParams.utmCampaign} />
      </form>
    </div>
  );
};

export default LeadCaptureForm;
