import dynamic from "next/dynamic";
import MainButton from "@/components/MainButton";
import Brush from "@/components/Brush";
import BlackBrush from "../BlackBrush";

const Background = dynamic(() => import("./Background"));

export default function SectionWhyCartel() {
  return (
    <div className="relative sm:pt-24 px-2 pb-24 sm:pb-56">
      <section id="COMMUNITY" className="pt-44 w-full h-px" />
      <Background />
      <BlackBrush className="absolute bottom-0 h-80 w-full translate-y-2/3" />
      <section className="w-full relative z-1 flex flex-col items-center sm:flex-row gap-20 max-w-5xl mx-auto">
        <div className="max-w-lg">
          <Brush className="scale-x-110" />

          <h3 className="font-wbb mx-auto max-w-sm sm:max-w-none text-8xl sm:text-9xl">
            <span className="text-6xl sm:text-7xl">
              <span className="text-lemon-green">WHY</span> JOIN
            </span>
            <br />
            THE <span className="text-lemon-green">CITRUS</span>{" "}
            <span className="text-[150%] leading-[77%]">CARTEL?</span>
          </h3>

          <Brush className="scale-x-110" />
        </div>

        <div className="flex-grow text-center sm:text-left max-w-lg sm:max-w-none font-semibold text-base [&_p]:mb-4">
          <p>
            Six months ago, the first 100 users registered on the platform. In
            less than a year, there are already over{" "}
            <span className="text-lemon-green">7,000</span> Lemon users.
          </p>

          <p>
            To take Lemon to the{" "}
            <span className="text-lemon-green">next level</span>, we want to
            continue building a community of loyal and satisfied users who are
            heard and directly rewarded based on their contributions to the
            growth of Lemon.
          </p>

          <p className="text-lemon-green">
            The Citrus Cartel has been designed to measure these contributions
            and achieve a fair distribution of rewards based on them.
          </p>

          <MainButton className="text-lg h-14 mt-2" href="/#CARTEL">
            Join The Cartel
          </MainButton>
        </div>
      </section>
    </div>
  );
}
