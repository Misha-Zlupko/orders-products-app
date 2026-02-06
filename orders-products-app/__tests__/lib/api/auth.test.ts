import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginApi, registerApi, meApi } from "@/lib/api/auth";

const mockUser = {
  id: "user-1",
  email: "test@example.com",
  name: "Test User",
};

describe("auth API client", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({}),
        })
      )
    );
  });

  describe("loginApi", () => {
    it("returns null when response is not ok", async () => {
      const result = await loginApi("a@b.com", "pass");
      expect(result).toBeNull();
    });

    it("returns AuthApiResponse when ok and body has token and user", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            token: "jwt-token",
            user: mockUser,
          }),
      } as Response);

      const result = await loginApi("test@example.com", "password");
      expect(result).toEqual({ token: "jwt-token", user: mockUser });
    });

    it("sends POST with email and password in body", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: "t", user: mockUser }),
      } as Response);

      await loginApi("user@test.com", "secret");
      expect(fetch).toHaveBeenCalledWith(
        "/api/auth/login",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "user@test.com", password: "secret" }),
        })
      );
    });
  });

  describe("registerApi", () => {
    it("returns null when response is not ok", async () => {
      const result = await registerApi("a@b.com", "pass", "Name");
      expect(result).toBeNull();
    });

    it("returns AuthApiResponse when ok", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            token: "jwt-token",
            user: mockUser,
          }),
      } as Response);

      const result = await registerApi("test@example.com", "password", "Test");
      expect(result).toEqual({ token: "jwt-token", user: mockUser });
    });

    it("sends POST with email, password, name", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: "t", user: mockUser }),
      } as Response);

      await registerApi("u@t.com", "pwd", "User Name");
      expect(fetch).toHaveBeenCalledWith(
        "/api/auth/register",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            email: "u@t.com",
            password: "pwd",
            name: "User Name",
          }),
        })
      );
    });
  });

  describe("meApi", () => {
    it("returns null when response is not ok", async () => {
      const result = await meApi("token");
      expect(result).toBeNull();
    });

    it("returns MeApiResponse when ok and body has user", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: mockUser }),
      } as Response);

      const result = await meApi("bearer-token");
      expect(result).toEqual({ user: mockUser });
    });

    it("sends GET with Authorization header", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: mockUser }),
      } as Response);

      await meApi("my-jwt");
      expect(fetch).toHaveBeenCalledWith(
        "/api/auth/me",
        expect.objectContaining({
          headers: { Authorization: "Bearer my-jwt" },
        })
      );
    });
  });
});
