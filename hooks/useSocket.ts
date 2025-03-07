import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
}

export const useSocket = create<SocketState>((set, get) => ({
  socket: null,
  connectSocket: (token?: string) => {
    if (get().socket) return;

    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
      withCredentials: true,
      auth: { token },
    });

    newSocket
      .on("connect", () => console.log("Connected to WebSocket"))
      .on("disconnect", () => console.log("Disconnected from WebSocket"));

    set({ socket: newSocket });
  },
  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
}));
