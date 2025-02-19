import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const val = await prisma.user.findMany({ take: 10 });
  console.log({ val });
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

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link
          href={"/auth/login"}
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
