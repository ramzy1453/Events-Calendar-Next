import RoomsSidebar from "@/components/events/rooms/RoomsSidebar";
import React from "react";

export default function Events({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-4em)] space-x-4">
      <RoomsSidebar />
      {children}
    </div>
  );
}
