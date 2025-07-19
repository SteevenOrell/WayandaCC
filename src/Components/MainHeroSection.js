import { FadeInAnimation } from "./FadeInAnimation";
import mainImg from "./Assets/HomeMainImgFinale.png"
function MainHeroSection(){

 return (
    <div id="HeroDiv1">

        <div id="Carousel-1" className="CarouselHeroSection1">
            
            <div className= "Carousel1-content" >

                    
                    <h3>
                     <FadeInAnimation > {"WHERE DIGNITY MEETS CARE"}</FadeInAnimation>
                    </h3>
                    <FadeInAnimation > 
                        <p> 
                            We connects skilled, compassionate barbers to nursing homes across Ontario to offer in-home haircuts to elderly residents. We make personal care mobile, professional and rooted in respect.
                                
                        </p>
                        <a href=""><button> Book a Visit  </button> </a> <a href=""><button> Join As a Barber</button></a>
                    </FadeInAnimation>
                    
            </div>
            
            <div className="Hero1Animation3D">
                <img src={mainImg} alt="MainHeroSection" />


            </div>
            
        </div>
       

        
    </div>
    )
}

export default MainHeroSection;