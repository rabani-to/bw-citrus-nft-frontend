import SectionHome from "@/components/SectionHome"
import SectionCommitment from "@/components/SectionCommitment"
import SectionWhyCartel from "@/components/SectionWhyCartel"
import SectionOrigins from "@/components/SectionOrigins"
import SectionLevels from "@/components/SectionLevels"
import SectionCartel from "@/components/SectionCartel"
import SectionFAQ from "@/components/SectionFAQ"
import Footer from "@/components/Footer"

export default function Home() {
  return (
	<>
	<SectionHome />
	<SectionCommitment />
	<SectionWhyCartel />
	<SectionLevels />
	<SectionOrigins />
	<SectionCartel />
	<SectionFAQ />
	<Footer />
	</>
  )
}
