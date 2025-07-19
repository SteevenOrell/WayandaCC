import { FadeInAnimation } from "./FadeInAnimation";
import aboutUsHeroSectionImg from './Assets/MainAboutUsVid.mp4'
function AboutUsHeroSection(){
    return (
        <div id="HeroDiv2">

            <div id="Carousel-2" className="CarouselHeroSection1">

                <div className= "Carousel2-content" >
                    <h3><FadeInAnimation> {"ABOUT US"}</FadeInAnimation> </h3>
                    <p><FadeInAnimation> {"WE DELIVER DIGNITY AND CARE"}</FadeInAnimation></p>
                </div>
                <div className="Hero2Animation3D">
                                 <video autoPlay loop muted playsInline>
                                                <source src={aboutUsHeroSectionImg} type="video/mp4"/>
                                    </video>
                </div>
                
            </div>
        

            
        </div>
    )
}

export default AboutUsHeroSection;