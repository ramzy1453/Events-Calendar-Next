import { useState } from "react";
import { generateCalendar } from "@/utils/calendar";
import { IEvent } from "@/types/event";
import { IDay } from "@/types";

export function useCalendar(events: IEvent[]) {
  const [selectedDay, setSelectedDay] = useState<IDay | null>(null);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isMagicLinkOpen, setIsMagicLinkOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const nextMonth = () => {
    setCurrentDate((prevDate) => ({
      month: prevDate.month === 11 ? 0 : prevDate.month + 1,
      year: prevDate.month === 11 ? prevDate.year + 1 : prevDate.year,
    }));
  };

  const previousMonth = () => {
    setCurrentDate((prevDate) => ({
      month: prevDate.month === 0 ? 11 : prevDate.month - 1,
      year: prevDate.month === 0 ? prevDate.year - 1 : prevDate.year,
    }));
  };

  const goToday = () => {
    setCurrentDate({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
  };

  const calendar = generateCalendar(
    currentDate.month,
    currentDate.year,
    events
  );

  return {
    selectedDay,
    setSelectedDay,
    isCreateEventOpen,
    isMagicLinkOpen,
    setIsMagicLinkOpen,
    setIsCreateEventOpen,
    currentDate,
    nextMonth,
    previousMonth,
    goToday,
    calendar,
  };
}
