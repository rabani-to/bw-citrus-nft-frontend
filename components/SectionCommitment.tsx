import Image from "next/image";

import asset_rm from "@/assets/roadmap.png";
import asset_rm_mobile from "@/assets/cartel-mobile.png";
import asset_border from "@/assets/border.png";

import MainButton from "@/components/MainButton";

export default function SectionCommitment() {
  return (
    <div className="px-3">
      <section className="w-full max-w-5xl flex flex-col sm:flex-row items-center sm:items-end mt-32 bg-black pb-1 mx-auto z-2 relative">
        <Image
          src={asset_border}
          fill
          placeholder="blur"
          className="absolute pointer-events-none size-full"
          alt=""
        />
        <div className="flex-grow px-4 pb-14 pt-28 flex flex-col items-center justify-start">
          <p className="text-center font-wbb text-[4.75rem]">
            <span className="text-lemon-green">LEMON</span>
            <br />
            COMMUNITY
          </p>

          <p className="text-lg font-bold text-lemon-green">
            LEVELS OF COMMITMENT
          </p>

          <p className="mt-6">For a smooth-progressive engagement</p>

          <MainButton
            href="https://discord.com/invite/CDt5R4NK8Z"
            target="_blank"
            className="text-lg mt-4 h-14"
          >
            Join Discord
          </MainButton>
        </div>

        <figure className="hidden sm:block w-full max-w-xl shrink-0">
          <Image placeholder="blur" src={asset_rm} alt="" />
        </figure>

        <figure className="sm:hidden px-2.5 pb-2 w-full max-w-xl shrink-0">
          <Image placeholder="blur" src={asset_rm_mobile} alt="" />
        </figure>
      </section>
    </div>
  );
}
