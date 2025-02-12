import { IEvent } from "@/app/events/[eventId]/page";

export const generateCalendar = (
  month: number,
  year: number,
  eventsData: IEvent[]
) => {
  const days = [];

  // 1️⃣ Nombre de jours dans le mois actuel
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  // 2️⃣ Premier jour du mois (dimanche = 0, lundi = 1, ...)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // 3️⃣ Trouver le mois précédent et suivant en gérant le changement d'année
  const prevMonth = month === 0 ? 11 : month - 1;
  const nextMonth = month === 11 ? 0 : month + 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextYear = month === 11 ? year + 1 : year;

  // 4️⃣ Nombre de jours du mois précédent
  const prevMonthTotalDays = new Date(prevYear, prevMonth + 1, 0).getDate();

  // 5️⃣ Remplir les jours du mois précédent
  const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  for (
    let i = prevMonthTotalDays - prevMonthDays + 1;
    i <= prevMonthTotalDays;
    i++
  ) {
    const date = new Date(prevYear, prevMonth, i);
    const events = eventsData.filter(
      (e) => e.date.toDateString() === date.toDateString()
    );

    days.push({
      date,
      currentMonth: false,
      events,
    });
  }

  // 6️⃣ Ajouter les jours du mois actuel
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const date = new Date(year, month, i);
    const events = eventsData.filter(
      (e) => e.date.toDateString() === date.toDateString()
    );
    days.push({
      date: new Date(year, month, i),
      currentMonth: true,
      events,
    });
  }

  // 7️⃣ Compléter avec les jours du mois suivant pour atteindre exactement 35 cases
  const nextMonthDays = 35 - days.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(nextYear, nextMonth, i);
    const events = eventsData.filter(
      (e) => e.date.toDateString() === date.toDateString()
    );

    days.push({
      date,
      currentMonth: false,
      events,
    });
  }

  return days.slice(0, 35);
};
