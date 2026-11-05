import Booking from '../Components/Booking';
import { HomeHero, Marquee, MissionSplit, HowItWorks, Pricing, JoinCta } from '../Components/Sections';

function Home() {
  return (
    <>
      <HomeHero />
      <Marquee />
      <MissionSplit />
      <HowItWorks />
      <Pricing />
      <JoinCta />
      <Booking />
    </>
  );
}

export default Home;
