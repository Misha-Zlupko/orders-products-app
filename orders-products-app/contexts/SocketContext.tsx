"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

interface SocketContextType {
  sessionsCount: number;
  isConnected: boolean;
  socketUnavailable: boolean;
}

const SocketContext = createContext<SocketContextType>({
  sessionsCount: 0,
  isConnected: false,
  socketUnavailable: false,
});

let sharedSocket: import("socket.io-client").Socket | null = null;

export function SocketProvider({ children }: { children: ReactNode }) {
  const [sessionsCount, setSessionsCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [socketUnavailable, setSocketUnavailable] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isSocketDisabled =
      typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_SOCKET_ENABLED === "false";
    const externalSocketUrl =
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_SOCKET_URL
        : undefined;
    const isVercel =
      typeof window !== "undefined" &&
      window.location.hostname.includes("vercel.app");

    // На Vercel без внешнего Socket-сервера сокет недоступен
    if (isSocketDisabled || (isVercel && !externalSocketUrl)) {
      setSocketUnavailable(true);
      return;
    }

    const socketBaseUrl = externalSocketUrl ?? window.location.origin;

    let cancelled = false;

    const setup = async () => {
      const { io } = await import("socket.io-client");
      if (cancelled) return null;

      if (!sharedSocket) {
        sharedSocket = io(socketBaseUrl, {
          path: "/socket.io",
          transports: ["websocket", "polling"],
        });
      }

      const socket = sharedSocket;

      const onConnect = () => setIsConnected(true);
      const onDisconnect = () => setIsConnected(false);
      const onSessions = (count: number) => setSessionsCount(count);

      socket.off("connect").on("connect", onConnect);
      socket.off("disconnect").on("disconnect", onDisconnect);
      socket.off("sessions").on("sessions", onSessions);

      if (socket.connected) {
        setIsConnected(true);
        socket.emit("get_sessions");
      }

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("sessions", onSessions);
      };
    };

    setup().then((cleanup) => {
      if (cleanup) cleanupRef.current = cleanup;
    });

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ sessionsCount, isConnected, socketUnavailable }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
