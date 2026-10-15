import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import InteractiveDemo from '@/components/InteractiveDemo'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import FormatLibrary from '@/components/FormatLibrary'
import OneProductManyStories from '@/components/OneProductManyStories'
import ExperimentationLab from '@/components/ExperimentationLab'
import Analytics from '@/components/Analytics'
import Research from '@/components/Research'
import Channels from '@/components/Channels'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <InteractiveDemo />
      <Problem />
      <HowItWorks />
      <FormatLibrary />
      <OneProductManyStories />
      <ExperimentationLab />
      <Analytics />
      <Research />
      <Channels />
      <FinalCTA />
      <Footer />
    </main>
  )
}
