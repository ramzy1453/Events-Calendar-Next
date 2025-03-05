"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
};

export default function JoinRoomPopup({ isOpen, onClose, onJoin }: Props) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleJoin = () => {
    if (!roomCode.trim()) {
      setError("Please enter a room code");
      return;
    }

    onJoin(roomCode);
    setRoomCode("");
    setError("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="room-code">Room Code</Label>
            <Input
              id="room-code"
              placeholder="Enter room code"
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-center text-lg tracking-wider"
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleJoin}>Join</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
