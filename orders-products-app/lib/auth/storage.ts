import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/config/constants";
import type { User } from "@/types/auth";

function isClient() {
  return typeof window !== "undefined";
}

export function getStoredToken(): string | null {
  if (!isClient()) return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser(): User | null {
  if (!isClient()) return null;
  try {
    const stored = localStorage.getItem(AUTH_USER_KEY);
    if (stored) return JSON.parse(stored) as User;
  } catch {}
  return null;
}

export function setStoredAuth(token: string, user: User): void {
  if (!isClient()) return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth(): void {
  if (!isClient()) return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}
