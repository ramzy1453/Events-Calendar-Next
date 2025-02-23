import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";

const words = [
  {
    text: "Create",
  },
  {
    text: "awesome",
  },
  {
    text: "calendars",
  },
  {
    text: "with",
  },
  {
    text: "Evento.",
    className: "text-blue-500 dark:text-blue-500",
  },
];
export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link
          href={"/calendar"}
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm flex items-center justify-center"
        >
          Join now
        </Link>
        <Link
          href={"/auth/signup"}
          className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm flex items-center justify-center"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
