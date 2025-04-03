import dynamic from "next/dynamic"
import Brush from "@/components/Brush"
import { cn } from "@/lib/utils"
import { Divider, FAQItem } from "./internals"
import Link from "next/link"

const Background = dynamic(() => import("./Background"))

export default function SectionFAQ({
  theme,
  className,
}: {
  theme?: "dark" | "light"
  className?: string
}) {
  return (
    <div id="FAQ" className={cn("relative z-1 pt-64 pb-32", className)}>
      <Background theme={theme} />

      <section className="relative z-1 w-full max-w-5xl px-2 mx-auto font-semibold text-base text-center">
        <nav className="flex items-center justify-center">
          <Brush className="max-w-xxs scale-y-400 sm:scale-y-200" />
          <span className="text-5xl sm:text-7xl text-lemon-green font-wbb px-4">
            FREQUENT
          </span>
          <Brush className="max-w-xxs scale-y-400 sm:scale-y-200" />
        </nav>

        <h2 className="text-7xl sm:text-9xl text-center font-wbb">QUESTIONS</h2>

        <div className="flex flex-col mt-24">
          <FAQItem title="What is The Citrus Cartel? ">
            The Citrus Cartel is a collection of NFTs designed to gamify the
            participation levels of The Family in Lemon. Through these levels,
            members of the Cartel contribute to the growth of our community and
            earn rewards that measure their impact on the platform.
          </FAQItem>

          <FAQItem title="What does my level depend on?">
            The level of your NFT depends on how much you engage with Lemon. If
            you're someone who just wants to create a few quizzes and learn
            something new, you can start as a Bitter Soldier. If you're someone
            who wants to help build Lemon alongside us, you can become El
            Patrón. It’s all a matter of your involvement in the project.
          </FAQItem>

          <FAQItem title="What happens if I stay at level 1?">
            No worries, having the Bitter Soldier already allows you to be part
            of La Familia. But if you want to unlock more perks and benefits,
            you'll need to start participating actively. In the Cartel, we
            always reward our own.
          </FAQItem>

          <FAQItem title="How difficult is it to get the roles on Discord?">
            It's not easy, but nothing worthwhile is. Roles are earned by
            gaining experience points, which you will get by participating in
            conversations on the server for each message you send. But don’t
            spam; moderators may temporarily or permanently ban you if it
            becomes a repeated action. Use this system to answer questions from
            newer members, resolve doubts, and report issues. Another way to
            gain experience is by participating in server activities: Gartic,
            Rumble, Trivia Nights, Meme Contest, etc.
          </FAQItem>

          <FAQItem title="Can I sell or gift my NFT?">
            Nah, you can't sell or transfer them. We want to avoid typical
            airdrop farmers because what we're really looking for is people who
            are here to help, contribute, and grow Lemon. If you join, we will
            reward you heavily. The Citrus Cartel is a family, not a
            marketplace.
          </FAQItem>

          <FAQItem
            title={
              <>
                What does <span className="italic">"Other benefits TBA"</span>{" "}
                exactly mean?
              </>
            }
          >
            We have designed a comprehensive program of tasks, benefits, and
            rewards for The Cartel. We have timelines and milestones to meet
            before revealing all the benefits that this collection will have.
            They will be gradually released throughout the season.
          </FAQItem>

          <FAQItem title="What happens if I’m not interested in creating content?">
            Not all levels require content creation. If you prefer to support
            from the shadows, levels like Bitter Soldier and Acid Commander
            provide you with a space in The Cartel without the need to create
            content.
          </FAQItem>

          <FAQItem title="I’m a creator; what standards of content do you expect?">
            You have complete freedom to write about any feature of Lemon, as
            well as to express thoughts, feelings, or opinions about the
            platform or any topic you want to cover. We only have two premises
            to fulfill:
            <br />
            <br />
            <span className="w-5 inline-block">1.</span> The content must not be
            generated with AI.
            <br />
            <span className="w-5 inline-block">2.</span> Quality is valued over
            quantity.
          </FAQItem>

          <FAQItem title="I have a question that isn't on the list; where can I ask it?">
            You can ask us directly in our{" "}
            <Link
              href="https://discord.com/invite/CDt5R4NK8Z"
              target="_blank"
              className="underline underline-offset-4"
            >
              Discord Server
            </Link>
            . We are very quick and efficient, so you won't be left with any
            doubts, no matter what your question is.
          </FAQItem>

          <Divider />
        </div>
      </section>
    </div>
  )
}