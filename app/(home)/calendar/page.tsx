"use client";
import { Calendar, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateRoomPopup } from "@/components/events/rooms/CreateRoomPopup";
import { useState } from "react";

export default function CalendarPage() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <CreateRoomPopup isOpen={isOpen} onClose={() => setOpen(false)} />
      <div className="flex-[3] border p-8 flex flex-col items-center justify-center min-h-[600px]">
        <div className="text-center space-y-6 max-w-md">
          <Calendar className="w-24 h-24 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-semibold text-muted-foreground">
            No Calendar Selected
          </h2>
          <p className="text-muted-foreground">
            Select an event from the sidebar or create a new one to get started.
          </p>
          <Button className="mt-4" onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Room
          </Button>
        </div>
      </div>
    </>
  );
}
