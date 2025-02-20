"use client";
import RoomsSidebar from "@/components/events/rooms/RoomsSidebar";

import { useRoomsQuery } from "@/lib/services/room.service";
import React from "react";

export default function Events({ children }: { children: React.ReactNode }) {
  const { data: rooms } = useRoomsQuery();
  return (
    <div className="flex h-[calc(100vh-4em)] space-x-4">
      <RoomsSidebar rooms={rooms?.data || []} />
      {children}
    </div>
  );
}
