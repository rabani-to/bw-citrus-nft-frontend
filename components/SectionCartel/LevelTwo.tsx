import { NFTProfile, Step, StepBoard } from "./internals"
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

import asset_l2 from "@/assets/cartel/l2.png"

export default function LevelTwo({ count = 0, onWhitelist = () => {} }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start">
      <StepBoard
        whitelistCount={count}
        position="left"
        className="sm:translate-x-6"
      >
        <h1 className="font-wbb mt-6 text-6xl text-center">LEMON MEMBER</h1>

        <div className="w-full sm:pl-8 mt-6 flex gap-3 flex-col">
          <Step number={1}>BE WHITELISTED AS LEMON USER</Step>
          <Step number={2}>
            ENTER AT TOP 50 LEMON USERS ON ZEALY ALL TIME LEADERBOARD
          </Step>
          <Step number={3}>GET THE JUICE MAFIA ROLE ON DISCORD</Step>
          <Step number={4}>
            ATTEND AT LEAST ONE XSPACE (WE'LL VALIDATE WITH POAPS)
          </Step>
          <Step number={5}>
            <Dialog>
              <DialogTrigger asChild>
                <SecondaryButton className="mt-4 sm:mt-0">
                  Whitelist Me
                </SecondaryButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>LEMON MEMBER</DialogHeader>
                <DialogOverflow>
                  <p>
                    A member helps grow and improve Lemon. They achieve these
                    objectives when: They obtain The Juice Mafia role on
                    Discord, rank among the top 50 positions on the Zealy
                    leaderboard (All time), attend at least one XSpace
                    (validated with POAP), but most importantly, we want them to
                    test new features and provide quality feedback.
                  </p>

                  <p>
                    They will receive a personalized NFT with their Lemon
                    username.
                  </p>

                  <p>
                    Additionally, they will participate in platform decisions
                    through the members' council and have the chance to earn
                    $LEMON and other benefits TBA*.
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
        imageSRC={asset_l2}
        title="ACID JUICE COMMANDER"
        label="LEVEL TWO"
        position="right"
        actionTrigger={
          <Dialog>
            <DialogTrigger asChild>
              <MainButton>
                <span>Backstory</span>
                <MdOutlineArrowForwardIos className="ml-1 scale-110" />
              </MainButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>ACID JUICE COMMANDER</DialogHeader>
              <DialogOverflow>
                <p>
                  “.. As his body recuperated, his mind also cleared, as if the
                  very lemon that had healed his physical wounds purified his
                  thoughts. Unlike Bitter, who had lost part of himself, Acid
                  remembered perfectly who he had been before the sky fell. He
                  had worked for SyntFarm, an unscrupulous pharmaceutical
                  company that toyed with people's hopes. He had been able to
                  offer any defective drug for a juicy commission. But as his
                  fortune grew, his relationship with his mother and son
                  deteriorated. They, although they had always been his refuge,
                  began to distance themselves, unable to accept the decisions
                  he made. Greed had robbed him of time and, in the end, also
                  the opportunity to save them{" "}
                  <span className="whitespace-nowrap">.. “</span>
                </p>
              </DialogOverflow>

              <SecondaryButton
                onClick={() => window.open("/chapters/#CHAPTER-2", "_blank")}
                className="mt-8 text-black scale-110"
              >
                Full chapter
              </SecondaryButton>
            </DialogContent>
          </Dialog>
        }
      />
    </div>
  )
}