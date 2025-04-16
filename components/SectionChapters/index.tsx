"use client";

import { Fragment, type PropsWithChildren } from "react";
import dynamic from "next/dynamic";

import { LuMoveRight } from "react-icons/lu";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { BackButton, NextButton } from "./internals";

const PageBackground = dynamic(
  () => import("@/components/SectionOrigins/PageBackground")
);

const TapeContainer = dynamic(() =>
  import("@/components/SectionCartel/internals").then(
    (mod) => mod.TapeContainer
  )
);

export default function SectionChapters() {
  return (
    <Fragment>
      <ContinueReading />

      <Carousel className="w-full mt-6 lg:mt-24 group flex relative">
        <BackButton />

        <CarouselContent>
          <CarouselItem>
            <Chapter title="CHAPTER 1">
              <p>
                Seven years had passed since the bombs fell. The sky, now gray,
                permanently hid the sun. Despite the ruin and desolation that
                spread, a vast expanse of lemon trees still stood by the sea,
                like an absurd and defiant miracle. The trees simply existed,
                they bloomed and bore lemons, repeating the cycle year after
                year, steadily, oblivious to the catastrophe that had consumed
                everything in its path.
              </p>

              <p>
                In nothing that remained could vestiges of humanity be
                recognized; only rubble and a heavy silence filled the empty
                horizon. Bitter no longer remembered his true name or who he had
                been before the bombs fell. Back then, he had been a child when
                the sky collapsed. And now, as an adult, he cared little about
                such things. His life was now reduced to a singular mission: to
                protect the last vital resource that remained immune to the
                poison of human stupidity. Each of those trees ignited in him a
                strange and distant spark of hope. Those trees and their lemons
                were a living contradiction, alien and out of tune in a world
                where they did not belong. And yet there they were, as if time
                and the radiation that devoured everything in its path had
                granted them inexplicable clemency for reasons Bitter would
                never understand.
              </p>
            </Chapter>
          </CarouselItem>

          <CarouselItem>
            <Chapter title="CHAPTER 1.1">
              <p>
                But Bitter didn’t need to understand it. His life, once a puzzle
                in the shadows of oblivion, now had a clear purpose. Protecting
                the lemon trees, those trees that seemed to belong to a sweet
                time before, had become his only reason to keep going. And
                though the rest of the universe was in ruins, as long as they
                continued to bloom, he would continue to fight.
              </p>

              <p>
                He patrolled with his rifle down, alert to any sign of
                intruders. Since the sky had turned gray, the Citrus Cartel had
                emerged not only as a family of strangers who watched over the
                welfare of the entire group, but they had also become its
                guardians, for these lemons contained the last breath of
                humanity. Bitter-Soldier had earned his nickname among the ranks
                of the cartel, surviving a great battle fought under the shadow
                of the citrus trees, whose leaves shone like emeralds, despite
                the dust the wind mercilessly threw day and night.
              </p>

              <p>
                That night, the Vacíos broke into The Refuge. Once human, now
                they were nothing more than shadows of flesh, with bulging eyes
                and festering sores that seemed not to feel. Their screams
                echoed like the cry of a pain they no longer understood, only
                God knows what kept them alive and drove them to chaos and
                destruction. Bitter Soldier's heart raced when they appeared,
                not out of fear for himself but for the lemon trees, which had
                become a symbol of resistance in this broken world.
              </p>
            </Chapter>
          </CarouselItem>

          <CarouselItem>
            <Chapter title="CHAPTER 1.2">
              <p>
                The battle raged throughout the night, a chaotic symphony of
                shadows and gunfire, screams and inhuman growls that broke the
                silence among the glowing trees. The Vacíos grew in number, but
                the Cartel had weapons, people with fierce determination, and
                luckily, some sanity left. They fought until dawn when the first
                rays of a sun that never arrived began to creep over the
                ash-stained horizon.
              </p>

              <p>
                The next day, he walked among the trees, touching the leaves
                with a mixture of relief and exhaustion. He felt the life still
                present in them, a small victory in the midst of so much death.
                Bitter knew that his fight was just beginning. The world outside
                the plantation was still dangerous, but within this piece of
                land, protected by the lemons, he found a purpose. He knew then
                that he would fight, not just for survival, but for the
                well-being of the only family he remembered, for the one he
                fought for, and for the one that gave meaning to the gray days
                that seemed to have no end.
              </p>

              <p>
                And with the sun never appearing, illuminated by his own
                feelings, Bitter accepted his fate, not without first deciding
                to remember that in the midst of despair, and though the world
                was in ruins, life could still bloom, one lemon at a time.
              </p>
            </Chapter>
          </CarouselItem>
        </CarouselContent>

        <NextButton />
      </Carousel>

      <Carousel
        id="CHAPTER-2"
        className="w-full mt-6 mb-32 group flex relative"
      >
        <BackButton />

        <CarouselContent>
          <CarouselItem>
            <Chapter title="CHAPTER 2">
              <p>
                Acid remembered clearly the first time the lemon trees saved his
                life. Bitter found him alone, lying in the sand by the beach,
                with cracked lips, wrapped in dirty rags, bleeding and
                completely dehydrated, barely conscious, on the verge of death.
                Bitter carried him with great effort to the Cartel's refuge,
                where his life hung by a thread for days. He thought of his son,
                of his mother, and accepted death while the fever consumed him.
              </p>

              <p>
                As he lay on a cot by the fire, a stranger ground fresh lemon
                peels with stones, forming a thick paste with a sharp, acidic
                scent that clung to his nose, a fragrance that mixed with the
                fever and the pain. While the poultice stung on his open wounds,
                Acid, who expected to die, discovered that instead of falling
                into darkness, his mind gradually cleared. The mixture not only
                disinfected the injuries, but they closed and hardened under a
                thin layer of scabs, as if the skin, regenerated by the lemon,
                sealed the wounds that radiation would not allow to heal.
              </p>
            </Chapter>
          </CarouselItem>

          <CarouselItem>
            <Chapter title="CHAPTER 2">
              <p>
                In a tuna can corroded from use, they boiled lemon juice until
                it bubbled, creating an acidic infusion that, when sipped before
                cooling, burned his throat with a comforting warmth. Each sip
                slowly removed the weakness that consumed him, gradually
                restoring his lost strength. He had spent two years feeling his
                body crumble; his skin, thin as paper, tore at the slightest
                touch. But as the days passed, he noticed an improvement in his
                lungs. The blood he coughed up disappeared, and his strength
                slowly began to manifest again. It became evident that the
                acidic elixir, as he called it, acted as an invaluable medicine,
                renewing his vitality and healing the damage caused by
                radiation.
              </p>

              <p>
                After three weeks, when he could finally stand, they offered him
                fresh leaves to chew. The taste was so bitter that it almost
                made him give up, but he found that it healed his ulcerated
                gums. The root of the lemon tree, boiled in infusion, helped him
                sleep and kept away the bad dreams and pain that tormented him
                over his son and his mother.
              </p>
            </Chapter>
          </CarouselItem>

          <CarouselItem>
            <Chapter title="CHAPTER 2.1">
              <p>
                As his body recovered, his mind cleared as well, as if the same
                lemon that had healed his physical wounds was purifying his
                thoughts. Unlike Bitter, who had lost part of himself, Acid
                remembered perfectly who he had been before the sky collapsed.
                He had worked for SyntFarm, an unscrupulous pharmaceutical
                company that toyed with people’s hopes. He had been willing to
                sell any faulty drug for a juicy commission. But as his fortune
                grew, his relationship with his mother and son deteriorated.
                They, although they had always been his refuge, began to
                distance themselves, unable to accept the decisions he was
                making. Greed had stolen his time and, in the end, the
                opportunity to save them as well.
              </p>

              <p>
                The disaster and the loss had changed him. When the nuclear
                shelters closed amid the alarms and chaos, he could not find his
                mother or his son, and so he was forced to take refuge without
                them. Every night, guilt kept him awake, chewing over memories
                and decisions like a poison that refused to let go. He lived in
                torment over the thought that he had changed too late, that he
                had been wrong all his life, that the only thing that really
                matters while one lives is family. Since then, his life had been
                an endless search.
              </p>
            </Chapter>
          </CarouselItem>

          <CarouselItem>
            <Chapter title="CHAPTER 2.2">
              <p>
                Acid, unlike many, did not give in to blind hope. He knew that
                the Cartel would not survive by accident, but that the future
                had to be planned, structured, and the trees defended. And he,
                more than anyone, was willing to do whatever was necessary to
                ensure not only their survival but that the Cartel would
                prosper.
              </p>

              <p>
                Since joining them, he couldn’t stay still. They had healed him,
                fed him, and granted him a high rank due to his ability to
                devise strategies and plans to protect the Cartel. When he
                wasn’t doing his job, he went on expeditions with Bitter,
                exploring the ruins, searching for traces of his family. But he
                had only managed to discover that they had not died in the
                initial bombing; they had headed south. Though he didn’t want to
                admit it, each false lead opened an emotional wound deeper than
                the physical scars that covered his tattooed skin.
              </p>

              <p>
                The hope of finding them and his love for the Cartel were the
                only things that pushed him to keep going. He didn’t know if he
                would ever find them, but until he did, his search, tinged with
                loss, was also the search of everyone in the Cartel: a struggle
                between the pain of the past and the uncertain hope of a better
                future.
              </p>
            </Chapter>
          </CarouselItem>
          <CarouselItem>
            <Chapter title='CHAPTER 3 - "martita"'>
              <p>
                Nobody ever called her by her name anymore. In the logs, she was
                just: `martita`. A remnant of a time when front and back
                still knew their place, when rendering was a question of
                choice—not survival. She wasn’t born in the Cartel. She appeared
                one day, in the middle of a sandstorm, hood up, carrying a
                terminal she’d built from scraps. The kind that ran queries on
                hope, not data.
              </p>

              <p>
                “martita” spoke little. Her mind was always
                elsewhere—rendering strategies, component hydration, keeping the
                UI of the Cartel's systems alive with as little lag as possible.
                To Acid, she was a mystery. To Bitter, a necessary anomaly. To
                herself, she was nothing more than a client-side survivor in a
                world too heavy to process on the server.
              </p>

              <p>
                She had arrived with strange knowledge: how to sync memory
                between minds without wires, how to predict the weather from the
                way lemons fell off the trees. Some said she wasn’t real, that
                she’d been coded into the world by some backend god who forgot
                to clean up the test environment.
              </p>
            </Chapter>
          </CarouselItem>
        </CarouselContent>

        <NextButton />
      </Carousel>
    </Fragment>
  );
}

function ContinueReading() {
  return (
    <section className="max-w-lg lg:hidden animate mt-12 text-center mx-auto">
      <style jsx scoped>{`
        .animate {
          opacity: 0;
          animation: animation 0.5s forwards ease-in;
          animation-delay: 2s;
        }

        @keyframes animation {
          to {
            opacity: 1;
          }
        }
      `}</style>
      <p className="text-sm opacity-70">Slide to continue reading</p>
      <div className="mx-auto pl-1 inline-block -mt-1 scale-x-200">
        <LuMoveRight className="text-4xl animate-in slide-in-from-left-2.5 repeat-infinite duration-1000 ease-in-out" />
      </div>
    </section>
  );
}

function Chapter({
  title,
  children,
}: PropsWithChildren<{
  title: string;
}>) {
  return (
    <div className="w-full cursor-grab text-black relative max-w-3xl mx-auto">
      <nav className="flex pointer-events-none sm:-translate-y-6 top-10 sm:top-0 left-0 absolute z-1 w-full justify-center items-center">
        <TapeContainer className="pt-2 pb-1">
          <span className="text-white -rotate-3 scale-y-110 text-5xl sm:text-7xl">
            {title}
          </span>
        </TapeContainer>
      </nav>

      <PageBackground className="absolute h-full inset-0" />

      <div className="relative pt-2 sm:pt-0 [&_p]:mt-8 font-semibold [&_p:first-child]:pt-24 [&_p:last-child]:pb-32 text-lg px-12 sm:px-16 text-center">
        {children}
      </div>
    </div>
  );
}
