import { Skeleton } from "@/components/ui/skeleton";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export default function CalendarSkeleton() {
  const renderCalendar = () => {
    return Array.from({ length: 35 })
      .fill(0)
      .map((day, i) => {
        return <Skeleton key={i} className="h-24" />;
      });
  };

  return (
    <div className="flex-[3] border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-5 w-44" />

        <div className="space-x-2 flex">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
      <div className="relative">
        <div className="grid grid-cols-7 gap-2">
          {weekdays.map((month) => (
            <Skeleton key={month} className="h-5" />
          ))}
          {renderCalendar()}
        </div>
      </div>
      <div>
        <Skeleton className="h-8 w-28" />
      </div>
    </div>
  );
}
