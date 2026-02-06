export const AUTH_TOKEN_KEY = "orders-products-token";
export const AUTH_USER_KEY = "orders-products-auth";
export const PERSIST_STORAGE_KEY = "root";
export const LOCALE_STORAGE_KEY = "orders-products-locale";
export const JWT_EXPIRES_IN = "7d";
export const API_BASE = "";

export const SUPPORTED_LOCALES = ["uk", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const API_ROUTES = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    me: "/api/auth/me",
  },
} as const;
