import Booking from '../Components/Booking';
import { AboutHero, FounderStory, Statements, Marquee, HowItWorks } from '../Components/Sections';

function AboutUs() {
  return (
    <>
      <AboutHero />
      <Marquee />
      <FounderStory />
      <Statements />
      <HowItWorks />
      <Booking />
    </>
  );
}

export default AboutUs;
