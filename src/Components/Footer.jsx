import {Link, useLocation,Outlet} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {useEffect, useState} from 'react';
import logo from './Assets/logo3.png'

function Footer(){

    const [width,setWidth] = useState(window.innerWidth);
         
    useEffect(()=>{
            function handleResize() {
                setWidth(window.innerWidth);
                
              }
              window.addEventListener("resize", handleResize)
              handleResize();
    },[])

    return(
 <>
   <footer id="Footer2" className="w-full">
             <div className='LogoFooterDiv'>
                <ul>
                 <li className='titlesInFooter'> <a href='#'><h5><img id='HomeLogo' src={logo} alt='Logo WCC' width="70" height="70" /></h5></a></li>
                 <li className="mbmodified-6"><p className="text-sm text-gray-700 leading-6 mbmodified-7">We make personal care mobile, professional and rooted in respect. {width> 500 ? <br/>: <></>} One haircut at a time</p>
                    </li>
                </ul>
             </div>
             {
                width<450 ?
                <div className='OtherFooterDiv'>
                 <ul>
                     <li className='titlesInFooter'><h5> Legal & Trust Note</h5></li>
                     <li className="mbmodified-6"><p className="text-sm text-gray-700 leading-6 mbmodified-7">All barbers are vetted and adhere to our hygiene and dignity-first care policy. We value your trust.</p></li>
                 </ul>
                </div> :
                <></>
             }
             <div className='OtherLinks'>
             { width >= 450 ?
             <div className='OtherFooterDiv'>
                 <ul>
                     <li className='titlesInFooter'><h5> Legal & Trust Note</h5></li>
                     <li className="mbmodified-6"><p className="text-sm text-gray-700 leading-6 mbmodified-7">All barbers are vetted and adhere to our hygiene and dignity-first care policy. We value your trust.</p></li>
                 </ul>
             </div> : <></>}
             <div className='OtherFooterDiv'>
                 <ul>
                    <li className='titlesInFooter'><h5>  Other Links </h5></li>
                    <li className="mbmodified-6"><HashLink to="/#HomeHeroSection"  >Home</HashLink></li>
                    <li className="mbmodified-6"><HashLink to="/about-us#AboutUsHeroSection"  >About Us</HashLink></li>
                    <li className="mbmodified-6"><HashLink to="/#PricingSection"  >Pricing</HashLink></li>   
                 </ul>
             </div>
                <div className='OtherFooterDiv'>
                <ul>
                                    
                    <li className='titlesInFooter'><h5 >Contact Us </h5></li>
                    <li className="mbmodified-6"><a href="mailto:wayandacareconnect@gmail.com"  >Business Email</a></li>
                </ul>
                        
             </div>
             </div>

            <Outlet/>
     </footer>

       <div id='AllRightReserved'>
            <span>©WCC {new Date().getFullYear()}, All rights reserved.</span>
        
        </div> 

            </>
)
}

export default Footer