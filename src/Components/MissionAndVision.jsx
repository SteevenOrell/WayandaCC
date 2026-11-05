import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import imgMission1 from './Assets/OurMissionImg1.png';
import imgVision1 from './Assets/OurVisionImg1.png';
import imgMission2 from './Assets/OurMissionImg2.png';
import imgVision2 from './Assets/OurVisionImg2.png'
import { FadeInAnimation } from "./FadeInAnimation";


function MissionAndVision(){
    const [width,setWidth] = useState(window.innerWidth);
     const location = useLocation();
    useEffect(()=>{
        function handleResize() {
            setWidth(window.innerWidth);
            
          }
          window.addEventListener("resize", handleResize)
          handleResize();
    },[])
    return(
        <>
       
        <div className="ImgTxtDiv2">

           
            <div className="Text-ImgTxtSection2">
                <h3>Our Mission </h3>
                <p>
                    To restore dignity, connection, and confidence to our elders by offering professional, mobile grooming services 
                    in the comfort of their care homes.
                </p>
            </div>
            <div className="Img-ImgTxtSection2" style={{ backgroundImage: `url(${ location.pathname === "/about-us" ? imgMission2:imgMission1})`, backgroundSize: 'cover'}}>
        
            </div>
 
        </div>

        <div className="ImgTxtDiv1">
            {
            width <= 860 ?
            <>
            <div className="Text-ImgTxtSection1">
  
                <h3>Our Vision </h3>

                <p>
               To see every nursing home in Ontario served by a team of trusted barbers who bring smiles, style, and spiritual care to those who need it most.

                </p>
 
                <div className="Img-ImgTxtSection1" style={{ backgroundImage: `url(${ location.pathname === "/about-us" ? imgVision2:imgVision1})`, backgroundSize: 'cover'}}>
                
                </div>
            </div>            
            
            
            
            
            </>   :
            <>
                <div className="Img-ImgTxtSection1" style={{ backgroundImage: `url(${location.pathname === "/about-us" ? imgVision2:imgVision1})`, backgroundSize: 'cover'}}>
                
                </div>
                
                <div className="Text-ImgTxtSection1">
    
                    <h3>Our Vision </h3>

                    <p>
                To see every nursing home in Ontario served by a team of trusted barbers who bring smiles, style, and spiritual care to those who need it most.

                    </p>
                </div>
            </> 
}
        </div>        
        </>
    )

}

export default MissionAndVision