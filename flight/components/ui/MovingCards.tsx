"use client";
import { cn } from "@/utils/cn";
import React, { useCallback, useEffect, useState } from "react";
import Star from "./Star";
import Image, { StaticImageData } from "next/image";
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image: StaticImageData;
    date: string;
    star: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, []);
  useEffect(() => {
    addAnimation();
  }, [addAnimation]);
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full bg-light relative rounded-2xl  flex-shrink-0  px-8 py-6 md:w-[450px]"
            // style={{
            //   background:
            //     "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            // }}border-slate-700border border-b-0
            key={item.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="flex gap-4 mb-4 items-center">
                <Image
                  src={item.image}
                  alt="User image"
                  width={70}
                  height={70}
                />{" "}
                <span className="flex flex-col gap-[4px]">
                  <span className=" text-sm block leading-[1.6] text-black font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm text-black/50">{item.date}</span>
                  <Star starCount={parseInt(item.star)} className="text-sm" />
                </span>
              </span>

              <span className="relative z-20 text-sm leading-[1.6] text-black font-normal">
                {item.quote}
              </span>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
