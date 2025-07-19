import AboutUsHeroSection from "../Components/AboutUsHeroSection";
import Footer from "../Components/Footer";
import FounderStory from "../Components/FounderStory";
import HowItWorks from "../Components/HowItWorks";
import MissionAndVision from "../Components/MissionAndVision";
import NavBar from "../Components/NavBar";

function AboutUs(){

    return(<>
        <NavBar/>
        <AboutUsHeroSection/>
        <FounderStory/>
        <MissionAndVision/>
        <HowItWorks/>
        <Footer/>
        </>)
}

export default AboutUs;