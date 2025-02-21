import { cn } from "@/lib/utils";
import React from "react";
import moment from "moment";
import { IEvent } from "@/types/event";

type Props = {
  onClick: () => void;
  isToday?: boolean;
  isSameMonth: boolean;
  backgroundColor?: string;
  date: Date;
  events: IEvent[];
};
export default function CalendarDayEvent({
  onClick,
  isToday,
  date,
  isSameMonth,
  backgroundColor,
  events,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor,
      }}
      className={cn(
        "border shadow-xl py-1 px-2 h-24 overflow-y-auto hover:bg-foreground/10 cursor-pointer",
        {
          "bg-foreground/20 hover:bg-foreground/30": isToday,
          "bg-foreground/10 hover:bg-foreground/20": !isSameMonth,
          "bg-red-500": events.length > 0,
        }
      )}
    >
      {isSameMonth ? date.getDate() : moment(date).format("D/MM/YYYY")}
    </div>
  );
}
