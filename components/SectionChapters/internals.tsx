"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export const BackButton = ({ className }: { className?: string }) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      className={cn(
        "text-white hidden lg:grid opacity-50 cursor-pointer place-items-center absolute top-28 pb-40 bottom-24 left-0 pr-16 z-1 w-[30vw]",
        canScrollPrev && "hover:opacity-100",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      <IoIosArrowBack className="scale-[1.5] transition-opacity text-4xl opacity-0 group-hover:opacity-100" />
    </button>
  );
};

export const NextButton = ({ className }: { className?: string }) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      className={cn(
        "text-white hidden lg:grid opacity-50 cursor-pointer place-items-center absolute top-28 pb-40 bottom-24 right-0 pl-16 z-1 w-[30vw]",
        canScrollNext && "hover:opacity-100",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
    >
      <IoIosArrowForward className="scale-[1.5] transition-opacity text-4xl opacity-0 group-hover:opacity-100" />
    </button>
  );
};
