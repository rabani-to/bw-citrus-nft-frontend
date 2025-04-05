import dynamic from "next/dynamic"
import { TapeContainer } from "../SectionCartel/internals"

const PageBackground = dynamic(() => import("./PageBackground"))

export default function SectionOrigins() {
  return (
    <section className="relative z-1 mt-16">
      <div className="w-full text-black relative max-w-3xl mx-auto">
        <nav className="flex top-0 left-0 sm:-translate-y-4 absolute z-1 w-full justify-center items-center">
          <TapeContainer className="pt-2 pb-1">
            <span className="text-white -rotate-3 scale-y-110 text-5xl sm:text-7xl">
              CITRUS CARTEL
            </span>
          </TapeContainer>
        </nav>

        <PageBackground className="absolute h-full sm:h-auto inset-0 sm:relative" />

        <div className="relative sm:absolute inset-0 pt-24 px-12 sm:px-16 text-center">
          <h1 className="font-wbb -rotate-1 text-8xl sm:text-[14rem]">
            ORIGINS
          </h1>

          <p className="font-wbb text-4xl">
            When the bombs fell and darkness covered every corner of the earth,
            the lemon trees remained.
          </p>

          <p className="mt-10 font-semibold text-lg pb-32 sm:pb-0">
            It was a mystery, a stubbornness of nature that defied the
            devastation that had devoured everything in its path. At the foot of
            these trees that stood by the sea, the Citrus Cartel was born, a
            group of survivors, as broken as the world around them, united by
            the mission to protect the last essence of life that radiation had
            spared. It was not hunger or thirst that drove them, but an
            irrational yet powerful faith: as long as the lemon trees continued
            to bloom, a small spark of hope for humanity persisted, just as the
            sweet and acidic aroma that each lemon flower released into the
            poisoned air of the apocalypse.
          </p>
        </div>
      </div>
    </section>
  )
}