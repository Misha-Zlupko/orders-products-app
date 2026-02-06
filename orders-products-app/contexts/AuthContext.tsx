"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  getStoredToken,
  getStoredUser,
  setStoredAuth,
  clearStoredAuth,
} from "@/lib/auth";
import { loginApi, registerApi, meApi } from "@/lib/api/auth";
import type { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    const storedUser = getStoredUser();
    if (!token || !storedUser) {
      queueMicrotask(() => setIsLoading(false));
      return;
    }
    meApi(token)
      .then((data) => {
        if (data?.user) setUser(data.user);
        else {
          clearStoredAuth();
          setUser(null);
        }
        setIsLoading(false);
      })
      .catch(() => {
        clearStoredAuth();
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginApi(email, password);
    if (data) {
      setStoredAuth(data.token, data.user);
      setUser(data.user);
      return true;
    }
    return false;
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const data = await registerApi(email, password, name);
      if (data) {
        setStoredAuth(data.token, data.user);
        setUser(data.user);
        return true;
      }
      return false;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    clearStoredAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export type { User } from "@/types/auth";
