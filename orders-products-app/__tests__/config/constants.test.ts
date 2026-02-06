import { describe, it, expect } from "vitest";
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  PERSIST_STORAGE_KEY,
  LOCALE_STORAGE_KEY,
  JWT_EXPIRES_IN,
  API_ROUTES,
  SUPPORTED_LOCALES,
} from "@/config/constants";

describe("config/constants", () => {
  it("exports expected storage keys", () => {
    expect(AUTH_TOKEN_KEY).toBe("orders-products-token");
    expect(AUTH_USER_KEY).toBe("orders-products-auth");
    expect(PERSIST_STORAGE_KEY).toBe("root");
    expect(LOCALE_STORAGE_KEY).toBe("orders-products-locale");
  });

  it("exports supported locales", () => {
    expect(SUPPORTED_LOCALES).toEqual(["uk", "en"]);
  });

  it("exports JWT expiry", () => {
    expect(JWT_EXPIRES_IN).toBe("7d");
  });

  it("exports API_ROUTES with auth endpoints", () => {
    expect(API_ROUTES.auth.login).toBe("/api/auth/login");
    expect(API_ROUTES.auth.register).toBe("/api/auth/register");
    expect(API_ROUTES.auth.me).toBe("/api/auth/me");
  });
});
