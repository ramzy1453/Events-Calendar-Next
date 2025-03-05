"use client";
import { Calendar, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateRoomPopup } from "@/components/events/rooms/CreateRoomPopup";
import { useState } from "react";
import JoinRoomPopup from "@/components/events/rooms/JoinRoomPopup";

export default function CalendarPage() {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isJoinOpen, setJoinOpen] = useState(false);
  return (
    <>
      {isCreateOpen && (
        <CreateRoomPopup
          isOpen={isCreateOpen}
          onClose={() => setCreateOpen(false)}
        />
      )}
      {isJoinOpen && (
        <JoinRoomPopup
          isOpen={isJoinOpen}
          onClose={() => setJoinOpen(false)}
          onJoin={() => {
            console.log("join");
          }}
        />
      )}
      <div className="flex-[3] border p-8 flex flex-col items-center justify-center min-h-[600px]">
        <div className="text-center space-y-6 max-w-md">
          <Calendar className="w-24 h-24 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-semibold text-muted-foreground">
            No Calendar Selected
          </h2>
          <p className="text-muted-foreground">
            Select an event from the sidebar or create a new one to get started.
          </p>
          <Button className="mt-4" onClick={() => setCreateOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Room
          </Button>
          <Button className="mt-4" onClick={() => setJoinOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Join Room
          </Button>
        </div>
      </div>
    </>
  );
}
