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
}

const SocketContext = createContext<SocketContextType>({
  sessionsCount: 0,
  isConnected: false,
});

let sharedSocket: import("socket.io-client").Socket | null = null;

export function SocketProvider({ children }: { children: ReactNode }) {
  const [sessionsCount, setSessionsCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    const setup = async () => {
      const { io } = await import("socket.io-client");
      if (cancelled) return null;

      if (!sharedSocket) {
        sharedSocket = io(window.location.origin, {
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
    <SocketContext.Provider value={{ sessionsCount, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
