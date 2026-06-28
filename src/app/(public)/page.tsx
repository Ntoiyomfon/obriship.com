import { CtaStrip } from "@/components/home/CtaStrip";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Services } from "@/components/home/Services";
import { StatsBar } from "@/components/home/StatsBar";
import { Trust } from "@/components/home/Trust";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Services />
      <Trust />
      <CtaStrip />
    </main>
  );
}
