import Booking from '../Components/Booking';
import { HomeHero, MissionSplit, HowItWorks, Pricing, JoinCta } from '../Components/Sections';

function Home() {
  return (
    <>
      <HomeHero />
      <MissionSplit />
      <HowItWorks />
      <Pricing />
      <JoinCta />
      <Booking />
    </>
  );
}

export default Home;
