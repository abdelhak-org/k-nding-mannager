export const appConfig = {
  name: "K-nding Manager",
  shortName: "K-nding",
  description:
    "Decision-support app for understanding and evaluating German mobile telecom contracts before signing.",
  locale: "de-DE",
  language: "de",
  supportEmail: "support@example.com",
  legalDisclaimer:
    "This app provides decision support and general information, not legal advice.",
  routes: {
    home: "/",
    login: "/auth/login",
    register: "/auth/register",
    dashboard: "/dashboard",
    contracts: "/dashboard/contracts",
  },
} as const;

export type AppConfig = typeof appConfig;
