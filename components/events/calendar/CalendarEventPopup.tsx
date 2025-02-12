import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  date: Date;
  open: boolean;
  onClose: () => void;
};
const events = [
  {
    id: "1",
    title: "Event 1",
    date: new Date(),
    description: "Description 1",
  },
  {
    id: "2",
    title: "Event 2",
    date: new Date(),
    description: "Description 2",
  },
];
export default function CalendarEventPopup({ open, date, onClose }: Props) {
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
              <div key={event.id} className="mb-4 p-2rounded">
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            ))
          )}
        </div>
        <Button onClick={onClose}>Fermer</Button>
      </DialogContent>
    </Dialog>
  );
}
