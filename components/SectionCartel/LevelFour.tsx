import { NFTProfile, Step, StepBoard } from "./internals"
import SecondaryButton from "@/components/SecondaryButton"
import MainButton from "@/components/MainButton"
import { FaUnlockAlt } from "react-icons/fa"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverflow,
  DialogTrigger,
} from "@/components/ui/dialog"

import asset_l4 from "@/assets/cartel/l4.png"

export default function LevelFour({ count = 0, onWhitelist = () => {} }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start">
      <StepBoard
        whitelistCount={count}
        position="left"
        className="sm:translate-x-6"
      >
        <h1 className="font-wbb mt-6 text-6xl text-center">
          LEMON CONTENT <span className="text-lemon-green">CREATORS</span>
        </h1>

        <div className="w-full sm:pl-8 mt-6 flex gap-3 flex-col">
          <Step number={1}>WRITE MEDIUM POSTS ABOUT LEMON</Step>

          <Step number={2}>
            WRITE THREADS ON X SHARING YOUR EXPERIENCE WITH LEMON
          </Step>

          <Step number={2}>
            REQUEST BETA ACCESS TO LEARNING PATHS AND BUILD A MINI-COURSE
          </Step>

          <Step number={4}>
            <Dialog>
              <DialogTrigger asChild>
                <SecondaryButton className="mt-4 sm:mt-0">
                  Whitelist Me
                </SecondaryButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>LEMON CONTENT CREATORS</DialogHeader>
                <DialogOverflow>
                  <p>
                    To join as a Content Creator you must write Medium posts
                    about Lemon, features, etc. And obtain 1,000+ claps across
                    all publications.
                  </p>

                  <p>
                    You need to share your experience with Lemon in threads that
                    reach 3,500+ views (total across posts). Finally you have to
                    request beta-access to Lemon Learning Paths and build a
                    mini-course with 10+ people that claimed their NFT
                    Certificate.
                  </p>

                  <p>
                    Content Creators earn the Discord role "The Real Cabras", a
                    unique NFT, and become Lemon Ambassadors. Receive rewards
                    for creating content and promoting Lemon + have access to
                    merch and $LEMON.
                  </p>
                </DialogOverflow>

                <SecondaryButton
                  onClick={onWhitelist}
                  className="mt-8 text-black scale-110"
                >
                  Continue
                </SecondaryButton>
              </DialogContent>
            </Dialog>
          </Step>
        </div>
      </StepBoard>

      <NFTProfile
        className="sm:-translate-x-6"
        imageSRC={asset_l4}
        title="SPICY JUICE PATRÓN"
        label="LEVEL FOUR"
        position="right"
        actionTrigger={
          <MainButton className="cursor-default">
            <FaUnlockAlt className="mr-2 scale-110" />
            <span>Backstory Locked</span>
          </MainButton>
        }
      />
    </div>
  )
}