import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import RoomItem from "./RoomItem";
import { IRoom } from "@/types/room";
import { useRouter } from "next/navigation";

type Props = { rooms: IRoom[] };
export default function RoomsSidebar({ rooms }: Props) {
  const [active, setActive] = useState<IRoom | boolean | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const router = useRouter();
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="border flex-[1]">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={"https://assets.aceternity.com/demos/babbu-maan.jpeg"}
                  alt={active.name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`name-${active.name}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.button
                    layoutId={`button-${active.name}-${id}`}
                    onClick={() => {
                      setActive(null);
                      router.push(`/calendar/${active._id}`);
                    }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    Join
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {rooms.map((card, i) => (
          <RoomItem
            key={i}
            id={id}
            title={card.name}
            src={"https://assets.aceternity.com/demos/babbu-maan.jpeg"}
            description={card.description}
            setActive={() => {
              setActive(card);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
