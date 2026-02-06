import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

const users = new Map<string, StoredUser>();

export async function addUser(
  email: string,
  password: string,
  name: string
): Promise<StoredUser | null> {
  const normalized = email.toLowerCase().trim();
  for (const u of users.values()) {
    if (u.email.toLowerCase() === normalized) return null;
  }
  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);
  const user: StoredUser = {
    id,
    email: normalized,
    name: name.trim() || normalized.split("@")[0],
    passwordHash,
  };
  users.set(id, user);
  return user;
}

export async function findUserByEmailAndPassword(
  email: string,
  password: string
): Promise<StoredUser | null> {
  const normalized = email.toLowerCase().trim();
  for (const u of users.values()) {
    if (u.email === normalized) {
      const ok = await bcrypt.compare(password, u.passwordHash);
      return ok ? u : null;
    }
  }
  return null;
}

export function findUserById(id: string): StoredUser | null {
  return users.get(id) ?? null;
}
