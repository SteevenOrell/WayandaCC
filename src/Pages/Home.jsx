import Footer from "../Components/Footer";
import HowItWorks from "../Components/HowItWorks";
import MainHeroSection from "../Components/MainHeroSection";
import MissionAndVision from "../Components/MissionAndVision";
import NavBar from "../Components/NavBar";
import Pricing from "../Components/Pricing";

function Home(){

    return(<>
    <NavBar/>
    <MainHeroSection/>
    <MissionAndVision/>
    <HowItWorks/>
    <Pricing/>
    <Footer/>
    </>)
}

export default Home;