"use client";

import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  useCreateMagicLinkQuery,
  useInviteUserMutation,
} from "@/lib/services/room.service";

type Props = {
  open: boolean;
  onClose: () => void;
  roomId: string;
};

export default function MagicLinkPopup({ open, onClose, roomId }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [email, setEmail] = useState("");
  const { data } = useCreateMagicLinkQuery(roomId);
  const inviteUserMutation = useInviteUserMutation();
  const magicLink = data?.data?.magicLink;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(magicLink!);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const handleInviteUser = async () => {
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    try {
      await inviteUserMutation.mutateAsync({ room: roomId, email });
      toast.success("Invitation sent successfully!");
      setEmail("");
    } catch {
      toast.error("Failed to send invitation. Please try again.");
    }
  };

  if (!magicLink) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Link & Invite Users</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="share-link">Magic Link</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="share-link"
                value={magicLink}
                readOnly
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
                className="flex-shrink-0"
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Share this link with others to give them access to your event.
          </p>
          <div className="space-y-2">
            <Label htmlFor="invite-email">Invite by Email</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="invite-email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleInviteUser}
                className="flex-shrink-0"
                disabled={inviteUserMutation.isPending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
