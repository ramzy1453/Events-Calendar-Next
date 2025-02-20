import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IDay } from "@/types";
import moment from "moment";
type Props = {
  day: IDay;
  open: boolean;
  onClose: () => void;
};

export default function CalendarEventPopup({ open, day, onClose }: Props) {
  const { events, date } = day;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Événements du {date.toLocaleDateString()}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {events.length === 0 ? (
            <p>Aucun événement pour cette date.</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="mb-4 p-2 rounded shadow border cursor-pointer hover:bg-black/75"
              >
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-600">
                  {moment(event.date).format("HH:mm")}
                </p>
              </div>
            ))
          )}
        </div>
        <Button onClick={onClose}>Fermer</Button>
      </DialogContent>
    </Dialog>
  );
}
