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
            <Label htmlFor="lead-name" className="text-primary-foreground/90">
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
                "h-12 border-primary-foreground/20 bg-primary-foreground text-foreground placeholder:text-muted-foreground",
                errors.name && "border-destructive focus-visible:ring-destructive",
              )}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
            />
            {errors.name ? (
              <p id="lead-name-error" className="text-sm text-primary-foreground/80">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-contact" className="text-primary-foreground/90">
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
                "h-12 border-primary-foreground/20 bg-primary-foreground text-foreground placeholder:text-muted-foreground",
                errors.contact && "border-destructive focus-visible:ring-destructive",
              )}
              aria-invalid={Boolean(errors.contact)}
              aria-describedby={errors.contact ? "lead-contact-error" : undefined}
            />
            {errors.contact ? (
              <p id="lead-contact-error" className="text-sm text-primary-foreground/80">
                {errors.contact}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-comment" className="text-primary-foreground/90">
            Комментарий
          </Label>
          <Textarea
            id="lead-comment"
            name="comment"
            value={values.comment}
            onChange={handleTextChange("comment")}
            placeholder="Можно коротко рассказать о себе, вопросе или удобном формате связи"
            className="min-h-[120px] border-primary-foreground/20 bg-primary-foreground text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="lead-consent"
              checked={values.consent}
              onCheckedChange={(checked) => handleConsentChange(checked === true)}
              className={cn(
                "mt-1 border-primary-foreground/40 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary",
                errors.consent && "border-destructive",
              )}
              aria-invalid={Boolean(errors.consent)}
            />
            <div className="space-y-2">
              <Label htmlFor="lead-consent" className="text-sm leading-relaxed text-primary-foreground/90">
                Я согласен(а) на обработку персональных данных и принимаю{" "}
                <a
                  href={config.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  политику проекта
                </a>
                .
              </Label>
              {errors.consent ? (
                <p className="text-sm text-primary-foreground/80">{errors.consent}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-primary-foreground/70">
            После отправки заявка сохранится в рабочем реестре, а команда получит уведомление
            в Telegram.
          </p>

          {submitState === "success" ? (
            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm leading-relaxed text-primary-foreground">
              {feedbackMessage}
            </div>
          ) : null}

          {submitState === "error" ? (
            <div className="rounded-2xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-primary-foreground">
              {feedbackMessage}
            </div>
          ) : null}

          {!isConfigured ? (
            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm leading-relaxed text-primary-foreground/80">
              Форма требует подключения Apps Script web app URL. Инструкция добавлена в
              README и `docs/lead-form-setup.md`.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              variant="outline"
              size="lg"
              disabled={submitState === "submitting" || !isConfigured}
              className="border-primary-foreground/50 bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary font-display tracking-wide text-base px-10 py-6 h-auto shadow-lg disabled:opacity-60"
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
