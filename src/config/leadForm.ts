export interface LeadFormConfig {
  policyUrl: string;
  iframeName: string;
  successMessage: string;
  requestTimeoutMs: number;
  endpointUrl: string;
  consentAcceptedValue: string;
}

const env = import.meta.env;

export const leadFormConfig: LeadFormConfig = {
  policyUrl: env.VITE_POLICY_URL || "https://recoveryvsadu.ru/#policy",
  iframeName: "recovery-lead-capture",
  successMessage:
    "Спасибо. Заявка отправлена, мы пришлём адрес сада и организационные детали участия.",
  requestTimeoutMs: 8000,
  endpointUrl: env.VITE_LEAD_SCRIPT_URL || "",
  consentAcceptedValue: env.VITE_LEAD_CONSENT_VALUE || "Да, согласен(а)",
};

export const isLeadFormConfigured = (config: LeadFormConfig = leadFormConfig) => {
  return Boolean(config.endpointUrl);
};
