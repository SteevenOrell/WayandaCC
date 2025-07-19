import {useState} from 'react';
import {Link, useLocation,Outlet} from 'react-router-dom'
function NavBar(){

    const [listOfContentsOpen,setOpenContents] = useState({"mobileMenu":false,"dropdownBar":false,"mobileDropdown":false });
    const [currentDropdownIndex,setCurrentDropdownIndex] = useState(-1)
    const [classNameOpen,setClassNameOfOpen] = useState("");
    const location = useLocation();


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
            <div id="nav-bar2" style={listOfContentsOpen.mobileMenu ? {backgroundColor:"#1781eb84"} : {}}>
                
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
                          { listOfContentsOpen.mobileMenu|| listOfContentsOpen["mobileDropdown"] ?"" :<Link to="/"> WCC {/*<img id='HomeLogo' src={LogoImg} alt='Home logo' width="100" height="80" /> */} </Link>}
                      </li>
                  </ul>
                </>)
                  :

                  ( <>
                    <ul id='Logo2'>
                      <li>
                          {  listOfContentsOpen["mobileDropdown"] ?"" :<Link to="/"> WCC {/*<img id='HomeLogo' src={LogoImg} alt='Home logo' width="100" height="80" /> */} </Link>}
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
                    <li id="HowItWorksLink" ><a href='#HowItWorksSection' >How It Works</a></li>  
                    <li id="AboutUsLink" ><Link to='/about-us'>About Us</Link></li> {/*Link to react router to use*/}
                    <li id="OurPricingLink" ><Link to='/#PricingSection'>Our Pricing</Link></li>
                    <li id="ContactSection" ><a href='#Footer2' >Contact Us</a></li>
                    
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

                    <li id="HowItWorksLink"  ><a href='#HowItWorksSection' onPointerEnter={()=>setTimeout(closeAll,500)}>How It Works</a></li>  
                    <li id="AboutUsLink" ><a href='#BioCareer' onPointerEnter={()=>setTimeout(closeAll,500)}>About Us</a></li> {/*Link to react router to use*/}
                    <li id="OurPricingLink" ><a href='#OurPricingSection'onPointerEnter={()=>setTimeout(closeAll,500)} >Our Pricing</a></li>
                    <li id="ContactSection" ><a href='#ContactForm' onPointerEnter={()=>setTimeout(closeAll,500)}>Contact Us</a></li>


                </div>
            </div>
            <div className={`blur-curtains2 ${classNameOpen}`} onMouseEnter={()=>{if(!listOfContentsOpen.searchBar){closeAll()}}} onClick={closeAll}></div>
            <Outlet/>
            </div>
        )
}
export default NavBar;