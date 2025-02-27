import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
};

export function JoinedFromLinkAlert({ isOpen, onClose, roomName }: Props) {
  const ref = useRef(null);
  useOutsideClick(ref, onClose);

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent ref={ref}>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to the Chat Room!</AlertDialogTitle>
          <AlertDialogDescription>
            You have successfully joined the room {`"${roomName}"`}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
