"use client";
import moment from "moment";
import { useParams } from "next/navigation";
import { useGetRoomEventsQuery } from "@/lib/services/event.service";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import AddEventPopup from "@/components/events/calendar/AddEventPopup";
import CalendarDayEvent from "@/components/events/calendar/CalendarDayEvent";
import CalendarEventPopup from "@/components/events/calendar/CalendarEventPopup";
import CalendarSkeleton from "@/components/events/calendar/CalendarSkeleton";
import MagicLinkPopup from "@/components/events/calendar/MagicLinkPopup";
import { useCalendar } from "@/hooks/useCalendar";

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
export default function RoomCalendar() {
  const { roomId } = useParams() as { roomId: string };

  const { data, isLoading } = useGetRoomEventsQuery(roomId);

  const events = data?.data || [];

  const {
    selectedDay,
    setSelectedDay,
    isCreateEventOpen,
    setIsCreateEventOpen,
    isMagicLinkOpen,
    setIsMagicLinkOpen,
    currentDate,
    nextMonth,
    previousMonth,
    goToday,
    calendar,
  } = useCalendar(events);

  return (
    <div className="flex-[3] border p-4 space-y-4">
      {isLoading ? (
        <CalendarSkeleton />
      ) : (
        <>
          {selectedDay && (
            <CalendarEventPopup
              open={!!selectedDay}
              day={selectedDay}
              onClose={() => setSelectedDay(null)}
            />
          )}
          {isCreateEventOpen && (
            <AddEventPopup
              open={isCreateEventOpen}
              onClose={() => setIsCreateEventOpen(false)}
              roomId={roomId}
            />
          )}
          {isMagicLinkOpen && (
            <MagicLinkPopup
              open={isMagicLinkOpen}
              onClose={() => setIsMagicLinkOpen(false)}
              roomId={roomId}
            />
          )}

          <div className="flex justify-between items-center">
            <div>{"Lore te3 one piece"}</div>
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
              {calendar.map((day, i) => (
                <CalendarDayEvent
                  key={i}
                  date={day.date}
                  onClick={() => setSelectedDay(day)}
                  isSameMonth={day.currentMonth}
                  isToday={
                    new Date(day.date).toDateString() ===
                    new Date().toDateString()
                  }
                  events={day.events}
                />
              ))}{" "}
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => setIsCreateEventOpen(true)}>
              <Plus /> Add event
            </Button>
            <Button onClick={() => setIsMagicLinkOpen(true)}>
              <User /> Invite user to room
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
