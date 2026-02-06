import { API_ROUTES } from "@/config/constants";
import type { AuthApiResponse, MeApiResponse } from "@/types/auth";

export async function loginApi(
  email: string,
  password: string
): Promise<AuthApiResponse | null> {
  const res = await fetch(API_ROUTES.auth.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return null;
  if (data.token && data.user) return data as AuthApiResponse;
  return null;
}

export async function registerApi(
  email: string,
  password: string,
  name: string
): Promise<AuthApiResponse | null> {
  const res = await fetch(API_ROUTES.auth.register, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return null;
  if (data.token && data.user) return data as AuthApiResponse;
  return null;
}

export async function meApi(token: string): Promise<MeApiResponse | null> {
  const res = await fetch(API_ROUTES.auth.me, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => ({}));
  if (data?.user) return data as MeApiResponse;
  return null;
}
