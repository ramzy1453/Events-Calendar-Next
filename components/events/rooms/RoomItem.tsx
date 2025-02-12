import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  title: string;
  id: string;
  src: string;
  description: string;
  ctaText: string;
  setActive: () => void;
};

export default function RoomItem(props: Props) {
  return (
    <motion.div
      layoutId={`card-${props.title}-${props.id}`}
      key={`card-${props.title}-${props.id}`}
      onClick={props.setActive}
      className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
    >
      <div className="flex gap-4 flex-col md:flex-row ">
        <motion.div layoutId={`image-${props.title}-${props.id}`}>
          <Image
            width={100}
            height={100}
            src={props.src}
            alt={props.title}
            className="h-40 w-40 md:h-14 md:w-14 object-cover object-top"
          />
        </motion.div>
        <div className="">
          <motion.h3
            layoutId={`title-${props.title}-${props.id}`}
            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
          >
            {props.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${props.description}-${props.id}`}
            className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
          >
            {props.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
