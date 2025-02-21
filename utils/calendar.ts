import { IEvent } from "@/types/event";

export const generateCalendar = (
  month: number,
  year: number,
  eventsData: IEvent[]
) => {
  const days = [];

  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = month === 0 ? 11 : month - 1;
  const nextMonth = month === 11 ? 0 : month + 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextYear = month === 11 ? year + 1 : year;

  const prevMonthTotalDays = new Date(prevYear, prevMonth + 1, 0).getDate();

  const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  for (
    let i = prevMonthTotalDays - prevMonthDays + 1;
    i <= prevMonthTotalDays;
    i++
  ) {
    const date = new Date(prevYear, prevMonth, i);
    const events = eventsData.filter(
      (e) => new Date(e.date).toDateString() === date.toDateString()
    );

    days.push({
      date,
      currentMonth: false,
      events,
    });
  }

  for (let i = 1; i <= totalDaysInMonth; i++) {
    const date = new Date(year, month, i);
    const events = eventsData.filter((e) => {
      return new Date(e.date).toDateString() === date.toDateString();
    });
    days.push({
      date: new Date(year, month, i),
      currentMonth: true,
      events,
    });
  }

  const nextMonthDays = 35 - days.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(nextYear, nextMonth, i);
    const events = eventsData.filter(
      (e) => new Date(e.date).toDateString() === date.toDateString()
    );

    days.push({
      date,
      currentMonth: false,
      events,
    });
  }

  return days.slice(0, 35);
};
