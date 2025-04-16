import dynamic from "next/dynamic";
import BlackBrush from "@/components/BlackBrush";
import Brush from "@/components/Brush";

const Background = dynamic(() => import("./Background"));

export default function SectionLevels() {
  return (
    <div className="relative px-2 pt-72 pb-32 z-1">
      <Background />
      <BlackBrush className="absolute bottom-0 h-80 w-full translate-y-2/3" />

      <section className="relative z-1 w-full max-w-5xl mx-auto font-semibold text-base [&_p]:mb-4 text-center [&_p]:max-w-2xl [&_p]:mx-auto">
        <nav className="flex items-center justify-center">
          <Brush className="scale-y-250 sm:scale-100" />
          <span className="text-5xl sm:text-7xl font-wbb px-4">WHY</span>
          <Brush className="scale-y-250 sm:scale-100" />
        </nav>

        <h2 className="text-7xl sm:text-9xl text-center font-wbb">
          ENGAGEMENT
          <br />
          <span className="text-lemon-green">LEVELS?</span>
        </h2>

        <Brush className="max-w-lg mx-auto mb-12" />

        <p>
          To follow to our vision, all levels of participation are significant;
          contributions are important, from the smallest to the large ones. The
          Cartel Levels structures a model for the community that:
        </p>

        <p className="text-lemon-green">
          {"a)"} Rewards all members transparently.
        </p>

        <p className="-mt-3 text-lemon-green">
          {"b)"} Offers clarity about the value of participation.
        </p>

        <p>
          That's why we have designed 4 levels of participation and invite you
          to join our family under the wing of The Citrus Cartel. Throughout the
          season, we will reveal more benefits, rewards, and privileges that
          this collection will bring.
        </p>
      </section>
    </div>
  );
}
