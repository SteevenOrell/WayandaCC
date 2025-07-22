import { FadeInAnimation } from "./FadeInAnimation";
import mainImg from "./Assets/HomeMainImgFinale.png";
import { useState, useEffect } from "react";
function MainHeroSection(){
    const [width,setWidth] = useState(window.innerWidth);
    
    useEffect(()=>{
        function handleResize() {
            setWidth(window.innerWidth);
            
          }
          window.addEventListener("resize", handleResize)
          handleResize();
    },[])
 return (
    <div id="HeroDiv1">

        <div id="Carousel-1" className="CarouselHeroSection1">
            
            <div className= "Carousel1-content" >

                    
                    <h3>
                     <FadeInAnimation > WHERE DIGNITY {width <= 460 ? <><br/></>:<></> } MEETS CARE</FadeInAnimation>
                    </h3>
                    <FadeInAnimation > 
                        <p> 
                           Connects skilled, compassionate barbers to nursing homes {width > 518 ? <><br/> to offer in home haircuts. </> :"" }  
                        </p>
                        <a href="#HowItWorksSection"><button> Learn more  </button> </a> 
                    </FadeInAnimation>
                    
            </div>
            
            <div className="Hero1Animation3D" id="HomeHeroSection">
                <img src={mainImg} alt="MainHeroSection" />


            </div>
            
        </div>
       

        
    </div>
    )
}

export default MainHeroSection;