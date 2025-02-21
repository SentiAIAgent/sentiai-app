export const AppConfig = {
  name: "SentiAI",
  env: {
    API_BASE_URL:
      //@ts-ignore
      import.meta.env.VITE_API_BASE_URL || "https://agent-api.sentiai.io/v1",
    PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID || "",
    PRIVY_CLIENT_ID: import.meta.env.VITE_PRIVY_CLIENT_ID || "",
  },
  link: {},
};
