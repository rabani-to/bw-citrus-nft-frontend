import { ModalLink, NFTProfile, Step, StepBoard } from "./internals"
import SecondaryButton from "@/components/SecondaryButton"
import MainButton from "@/components/MainButton"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverflow,
  DialogTrigger,
} from "@/components/ui/dialog"

import asset_bitter from "@/assets/cartel/bitter.png"

export default function LevelOne({ count = 0, onWhitelist = () => {} }) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start">
      <NFTProfile
        className="sm:translate-x-6"
        imageSRC={asset_bitter}
        title="BITTER JUICE SOLDIER"
        label="LEVEL ONE"
        position="left"
        actionTrigger={
          <Dialog>
            <DialogTrigger asChild>
              <MainButton>
                <span>Backstory</span>
                <MdOutlineArrowForwardIos className="ml-1 scale-110" />
              </MainButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>THE BITTER SOLDIER</DialogHeader>
              <DialogOverflow>
                <p>
                  “.. Bitter was the only exception, though he no longer
                  remembered his true name or who he had been before the bombs
                  fell. Back then, he had been a child when the sky collapsed.
                  And now, as an adult, he cared little about such things. His
                  life was now reduced to a singular mission: to protect the
                  last vital resource that remained immune to the poison of
                  human stupidity. Each of those trees ignited in him a strange
                  and distant spark of hope. Those trees and their lemons were a
                  living contradiction, alien and out of tune in a world where
                  they did not belong. And yet there they were, as if time and
                  the radiation that devoured everything in its path had granted
                  them inexplicable clemency for reasons Bitter would never
                  understand <span className="whitespace-nowrap">.. “</span>
                </p>
              </DialogOverflow>

              <SecondaryButton
                onClick={() => window.open("/chapters", "_blank")}
                className="mt-8 text-black scale-110"
              >
                Full chapter
              </SecondaryButton>
            </DialogContent>
          </Dialog>
        }
      />

      <StepBoard
        whitelistCount={count}
        position="right"
        className="sm:-translate-x-6"
      >
        <h1 className="font-wbb mt-6 text-6xl text-center">LEMON USER</h1>

        <div className="w-full sm:pl-14 mt-8 flex gap-6 flex-col">
          <Step number={1}>MINT EARLY ADOPTERS NFT</Step>
          <Step number={2}>
            CREATE AT LEAST 3 QUIZZES WITH AT LEAST 6 ITEMS ON IT
          </Step>
          <Step number={3}>
            <Dialog>
              <DialogTrigger asChild>
                <SecondaryButton className="mt-4 sm:mt-0">
                  Whitelist Me
                </SecondaryButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>LEMON USER</DialogHeader>
                <DialogOverflow>
                  <p>
                    A user is someone who has registered on Lemon and minted the{" "}
                    <ModalLink href="https://www.lmdt.xyz/claim">
                      Early Adopters NFT
                    </ModalLink>
                    . Additionally, they must have at least 3 quizzes with more
                    than 6 elements (no spam). The majority of the community
                    members will be users, making this a crucial level for
                    Lemon's growth, and we will reward the actions these users
                    take.
                  </p>

                  <p>
                    They will be able to mint the Bitter Soldier NFT, benefits
                    TBA*.
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