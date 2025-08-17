import {useState, useEffect} from 'react';
import {Link, useLocation,Outlet} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from './Assets/logo3.png'
function NavBar(){

    const [listOfContentsOpen,setOpenContents] = useState({"mobileMenu":false,"dropdownBar":false,"mobileDropdown":false });
    const [currentDropdownIndex,setCurrentDropdownIndex] = useState(-1)
    const [classNameOpen,setClassNameOfOpen] = useState("");
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);

  // useEffect hook to add and clean up the scroll event listener
  useEffect(() => {
    // Function to handle the scroll event
    const handleScroll = () => {
      // Check if the vertical scroll position is greater than 50 pixels
      // You can adjust this value to change when the effect triggers
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]); // Re-run the effect if the scrolled state changes


    function handleCloseMenuDropdown(){

        setCurrentDropdownIndex(-1);
        setOpenContents({...listOfContentsOpen,"mobileMenu":true, "dropdownBar":false,"mobileDropdown":false})

    }



    function handleOpenMenu(){
        setClassNameOfOpen("open");
        setOpenContents({...listOfContentsOpen,"mobileMenu":true})
    }
    

    function closeAll(){
        // console.log("Close all")
        if(currentDropdownIndex != -1){
            setCurrentDropdownIndex(-1);
        }
        setOpenContents({"mobileMenu":false, "dropdownBar":false,"mobileDropdown":false})
        setClassNameOfOpen("");
    }
    
    return (
            <div id='nav-bar2-div'>
            <div id="nav-bar2" style={listOfContentsOpen.mobileMenu ? {backgroundColor:"#1781eb84"} : scrolled ? { "WebkitBackdropFilter": "blur(4px)", "backdropFilter": "blur(4px)"} : {}} >
                
                {
                   listOfContentsOpen["mobileDropdown"] ?
                  ( <>


                  <ul id="burger-menu2">
                      <li onClick={()=>{if(!listOfContentsOpen.mobileMenu && !listOfContentsOpen["mobileDropdown"]){return handleOpenMenu()} closeAll()}}>
                          <a href='#' > {listOfContentsOpen.mobileMenu && classNameOpen === "open" || listOfContentsOpen["mobileDropdown"] ? "CLOSE" : "MENU"}  </a> 
                      </li>
                  </ul>
                  <ul id='Logo2'>
                      <li>
                          { listOfContentsOpen.mobileMenu|| listOfContentsOpen["mobileDropdown"] ?"" :<HashLink to="/#HomeHeroSection"> <img id='HomeLogo' src={logo} alt='Logo WCC' width="75" height="75" />  </HashLink>}
                      </li>
                  </ul>
                </>)
                  :

                  ( <>
                    <ul id='Logo2'>
                      <li>
                          {  listOfContentsOpen["mobileDropdown"] ?"" :<HashLink to="/#HomeHeroSection"> <img id='HomeLogo' src={logo} alt='Logo WCC' width="90" height="90" />   </HashLink>}
                      </li>
                  </ul>

                  <ul id="burger-menu2">
                      <li onClick={()=>{if(!listOfContentsOpen.mobileMenu && !listOfContentsOpen["mobileDropdown"]){return handleOpenMenu()} closeAll()}}>
                         <a href='#' > {listOfContentsOpen.mobileMenu && classNameOpen === "open" || listOfContentsOpen["mobileDropdown"] ? "CLOSE" : "MENU"} </a>
                      </li>
                  </ul>
                </>
                )
                }


                <ul id="nav-links2">
                    <li id="HowItWorksLink" ><HashLink to='#HowItWorksSection' >How It Works</HashLink></li>  
                    <li id="AboutUsLink" ><HashLink to='/about-us#AboutUsHeroSection'>About Us</HashLink></li> 
                    <li id="OurPricingLink" ><HashLink to='/#PricingSection'>Our Pricing</HashLink></li>
                    <li id="ContactSection" ><HashLink to='#Footer2' >Contact Us</HashLink></li>
                    
                    {/* onMouseEnter={handleCloseDropdown} */}

                </ul>


                {listOfContentsOpen["mobileDropdown"] ? 
                <ul id="BackToMobileMenu" onPointerEnter={handleCloseMenuDropdown}>
                    <li>
                         <button><a href='' >Back to Menu </a></button>
                    </li>
                </ul>:""}
            </div>
            <div className= {`divContainer ${classNameOpen}`}>

                <div className={ listOfContentsOpen.mobileMenu ? `mobile-content-menu2 ${classNameOpen}` : 'mobile-content-menu2'}>

                    <li id="HowItWorksLink"  ><HashLink to='#HowItWorksSection' onPointerEnter={()=>setTimeout(closeAll,500)}>How It Works</HashLink></li>  
                    <li id="AboutUsLink" ><HashLink to='/about-us#AboutUsHeroSection' onPointerEnter={()=>setTimeout(closeAll,500)}>About Us</HashLink></li> {/*Link to react router to use*/}
                    <li id="OurPricingLink" ><HashLink to='/#PricingSection'onPointerEnter={()=>setTimeout(closeAll,500)} >Our Pricing</HashLink></li>
                    <li id="ContactSection" ><HashLink to='#Footer2' onPointerEnter={()=>setTimeout(closeAll,500)}>Contact Us</HashLink></li>


                </div>
            </div>
            <div className={`blur-curtains2 ${classNameOpen}`} onMouseEnter={()=>{if(!listOfContentsOpen.searchBar){closeAll()}}} onClick={closeAll}></div>
            <Outlet/>
            </div>
        )
}
export default NavBar;