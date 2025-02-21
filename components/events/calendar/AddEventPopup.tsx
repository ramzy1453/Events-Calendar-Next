import { useState } from "react";
import { useFormik } from "formik";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addEventSchema } from "@/lib/validation/event.schema";
import { ICreateEvent } from "@/types/event";
import { useCreateEventMutation } from "@/lib/services/event.service";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  roomId: string;
};

export default function AddEventPopup({ open, onClose, roomId }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { mutateAsync: createEvent } = useCreateEventMutation(roomId);

  const formik = useFormik<ICreateEvent>({
    initialValues: {
      name: "",
      description: "",
      date: new Date(),
    },
    validationSchema: addEventSchema,
    onSubmit: (values) => {
      toast.promise(createEvent(values), {
        loading: "Creating Event",
        success: "Event Created Successfully",
        error: (err) =>
          err?.response?.data?.message || "Error during event creation",
      });
      onClose();
    },
  });
  console.log({ errorDate: formik.errors });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              {...formik.getFieldProps("name")}
              className={cn(
                formik.errors.name &&
                  formik.touched.name &&
                  "border-destructive"
              )}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-sm text-destructive">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...formik.getFieldProps("description")}
              className={cn(
                formik.errors.description &&
                  formik.touched.description &&
                  "border-destructive"
              )}
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-sm text-destructive">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Date and Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    if (newDate) {
                      formik.setFieldValue("date", newDate);
                    }
                  }}
                  initialFocus
                />
                <div className="p-3 border-t">
                  <Input
                    type="time"
                    onChange={(e) => {
                      if (date) {
                        const [hours, minutes] = e.target.value.split(":");
                        const newDate = new Date(date);
                        newDate.setHours(parseInt(hours), parseInt(minutes));
                        setDate(newDate);
                        formik.setFieldValue("date", newDate);
                      }
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
            {formik.errors.date && formik.touched.date && (
              <p className="text-sm text-destructive">
                {String(formik.errors.date)}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
