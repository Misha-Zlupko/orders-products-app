import { describe, it, expect, beforeEach } from "vitest";
import { signToken, verifyToken } from "@/lib/auth/jwt";
import type { JwtPayload } from "@/lib/auth/jwt";

const payload: JwtPayload = {
  userId: "user-123",
  email: "jwt@test.com",
  name: "JWT User",
};

describe("JWT auth", () => {
  describe("signToken", () => {
    it("returns a non-empty string", () => {
      const token = signToken(payload);
      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
      expect(token.split(".")).toHaveLength(3);
    });
  });

  describe("verifyToken", () => {
    it("decodes valid token and returns payload", () => {
      const token = signToken(payload);
      const decoded = verifyToken(token);
      expect(decoded).not.toBeNull();
      expect(decoded).toMatchObject({
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
      });
    });

    it("returns null for invalid token", () => {
      expect(verifyToken("invalid.token.here")).toBeNull();
      expect(verifyToken("")).toBeNull();
    });

    it("returns null for tampered token", () => {
      const token = signToken(payload);
      const tampered = token.slice(0, -2) + "xx";
      expect(verifyToken(tampered)).toBeNull();
    });
  });
});
