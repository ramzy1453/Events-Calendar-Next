"use client";
import CalendarDayEvent from "@/components/events/calendar/CalendarDayEvent";
import CalendarEventPopup from "@/components/events/calendar/CalendarEventPopup";
import { generateCalendar } from "@/lib/time";
import moment from "moment";
import { useParams } from "next/navigation";
import { useState } from "react";

const months = moment.months();
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export default function EventsCalendar() {
  const params = useParams();
  const eventId = params.eventId;

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      if (prevDate.month === 11) {
        return { month: 0, year: prevDate.year + 1 };
      }
      return { month: prevDate.month + 1, year: prevDate.year };
    });
  };

  const previousMonth = () => {
    setCurrentDate((prevDate) => {
      if (prevDate.month === 0) {
        return { month: 11, year: prevDate.year - 1 };
      }
      return { month: prevDate.month - 1, year: prevDate.year };
    });
  };
  const goToday = () => {
    setCurrentDate({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
  };
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = (date: Date | null) => () => {
    setOpen(true);
    setSelectedDate(date);
  };

  const renderCalendar = (month: number, year: number) => {
    const calendar = generateCalendar(month, year, eventsData);
    console.log({ calendar });

    return calendar.map((day, i) => {
      return (
        <CalendarDayEvent
          key={i}
          date={day.date}
          onClick={openModal(day.date)}
          isSameMonth={day.currentMonth}
          isToday={day.date.toDateString() === new Date().toDateString()}
          events={day.events}
        />
      );
    });
  };

  return (
    <div className="flex-[3] border p-4 space-y-4">
      <CalendarEventPopup open={open} date={new Date()} onClose={closeModal} />
      <div className="flex justify-between items-center">
        <div>{eventId}</div>
        <h1>
          {months[currentDate.month]} {currentDate.year}
        </h1>
        <div className="space-x-2">
          <button
            onClick={previousMonth}
            className="border hover:bg-foreground/10 cursor-pointer py-0.5 px-2"
          >
            Previous
          </button>
          <button
            onClick={goToday}
            className="border hover:bg-foreground/10 cursor-pointer py-0.5 px-2"
          >
            Today
          </button>{" "}
          <button
            onClick={nextMonth}
            className="border hover:bg-foreground/10 cursor-pointer py-0.5 px-2"
          >
            Next
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="grid grid-cols-7 gap-2">
          {weekdays.map((day) => (
            <div
              key={day}
              className="border shadow-xl py-1 px-2 hover:bg-foreground/10 cursor-pointer"
            >
              {day}
            </div>
          ))}
          {renderCalendar(currentDate.month, currentDate.year)}
        </div>
      </div>
    </div>
  );
}

export interface IEvent {
  id: string;
  title: string;
  date: Date;
  description: string;
  color: string;
}
const eventsData: IEvent[] = [
  {
    id: "2",
    title: "Conférence DevOps",
    date: new Date(2025, 1, 19, 14, 0),
    description: "Discussion sur les bonnes pratiques DevOps.",
    color: "blue",
  },
  {
    id: "3",
    title: "Hackathon",
    date: new Date(2025, 1, 15, 9, 0),
    description: "Compétition de programmation sur 3 jours.",
    color: "red",
  },
  {
    id: "6",
    title: "Hackathon IA",
    date: new Date(2025, 1, 20, 8, 0),
    description: "Un hackathon dédié à l'intelligence artificielle.",
    color: "green",
  },
  {
    id: "7",
    title: "Sprint Dev Web",
    date: new Date(2025, 1, 25, 9, 30),
    description: "Sprint intensif pour développer une application web.",
    color: "orange",
  },
];
