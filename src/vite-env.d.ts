/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_SCRIPT_URL?: string;
  readonly VITE_LEAD_CONSENT_VALUE?: string;
  readonly VITE_POLICY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
