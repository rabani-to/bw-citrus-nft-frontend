import { Fragment } from "react"
import { TopNavigation } from "@/components/SectionHome"

import SectionFAQ from "@/components/SectionFAQ"
import SectionChapters from "@/components/SectionChapters"

export default function PageChapters() {
  return (
    <Fragment>
      <TopNavigation />
      <SectionChapters />
      <SectionFAQ />
    </Fragment>
  )
}