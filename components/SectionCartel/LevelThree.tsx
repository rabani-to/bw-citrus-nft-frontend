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

import asset_l3 from "@/assets/cartel/l3.png"

export default function LevelThree({ count = 0, onWhitelist = () => {} }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start">
      <NFTProfile
        className="sm:translate-x-6"
        imageSRC={asset_l3}
        title="SWEET JUICE SEÑOR"
        label="LEVEL THREE"
        position="left"
        actionTrigger={
          <MainButton className="cursor-default">
            <FaUnlockAlt className="mr-2 scale-110" />
            <span>Backstory Locked</span>
          </MainButton>
        }
      />

      <StepBoard
        whitelistCount={count}
        position="right"
        className="sm:-translate-x-6"
      >
        <h1 className="font-wbb mt-6 text-6xl text-center">
          LEMON CONTRIBUTOR
        </h1>

        <div className="w-full sm:pl-8 mt-6 flex gap-3 flex-col">
          <Step number={1}>INVITE 15 USERS WITH YOUR REFERRAL CODE</Step>
          <Step number={2}>GET THE LEMONADE LEGENDS ROLE ON DISCORD</Step>
          <Step number={3}>
            SPREAD THE WORD: ORGANIZE XSPACES, PODCAST/IRL EVENTS ABOUT LEMON
          </Step>
          <Step number={4}>HELP US SECURE GRANTS OR PARTNERSHIPS</Step>
          <Step number={5}>
            <Dialog>
              <DialogTrigger asChild>
                <SecondaryButton className="mt-4 sm:mt-0">
                  Whitelist Me
                </SecondaryButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>LEMON CONTRIBUTOR</DialogHeader>
                <DialogOverflow>
                  <p>
                    A contributor actively helps improve the platform by
                    securing grants, creating partnerships, organizing events,
                    attracting new users, and talking about Lemon on their
                    social media. In short, they promote and publicize Lemon. To
                    formally become a contributor, they must have completed all
                    the aforementioned steps.
                  </p>

                  <p>
                    Contributors will be able to customize the background color,
                    frame, and username on their NFT.
                  </p>

                  <p>
                    Additionally, they will have access to exclusive
                    merchandise, $LEMON points, and other significant benefits
                    TBA*
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
    </div>
  )
}