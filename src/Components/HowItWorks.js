import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react'
function HowItWorks(){
    const [isActiveTab,setActiveTab] = useState('Tab1');
    const [width,setWidth] = useState(window.innerWidth);
    const [state, handleSubmit] = useForm("xkgzjrrz");
    const location = useLocation();
    useEffect(()=>{
        function handleResize() {
            setWidth(window.innerWidth);
            
          }
          window.addEventListener("resize", handleResize)
          handleResize();
    },[])
    return(
    <div id="HowItWorksSection" >
        <div className="TabsButton">
            <span className={isActiveTab == 'Tab1' ? "TabOpen" : ""} onClick={()=>setActiveTab('Tab1')}><button>For Nursing Homes </button></span>
           <span className={isActiveTab == 'Tab2' ? "TabOpen" : ""} onClick={()=>setActiveTab('Tab2')}><button> For Barbers</button></span>
        </div>
        <div id="Tab1"  className={isActiveTab == 'Tab1' ? "TabSection open" : "TabSection"}>
                <div className="FormHowItWorkSection" >
                  <form  method='POST'onSubmit={handleSubmit}>
                    <h5>Booking Form</h5>
                    <br/>
                    <br/>
                    <div>
                        <label className='labelForm'>Full Name</label><br/>
                        <input type='name' placeholder='Your name' name="name" required/> <br/>
                    </div>
                    <div>
                        <label className='labelForm'> Email</label><br/>
                        <input type='email' placeholder='Your email' name='email'  required/> <br/>
                    </div>
                    <div>
                        <label className='labelForm'> Booking Date/Time</label><br/>
                        <input type='datetime-local' placeholder='Preferred Date' name='date'  required/> <br/>
                    </div>                    
                    <div>
                        <label className='labelForm'> Number of resident to serve</label><br/>
                        <input type='number' min='1' max='30'  name='date' placeholder='Resident numbers to serve' required/> <br/>
                    </div>
                    <button type="submit" disabled={state.submitting}>Submit</button>
                </form>
                </div>
                
                <div className="TextHowItWorkSection">
    
                    <h3 style={location.pathname === "/about-us" ? {color:'#e99500'}:{}}>Nursing Homes </h3>

                    <p>
               We bring licensed barbers directly to your facility. 
                You simply need to fill out a short booking form.
                Choose your preferred dates/times.
                Let us know how many residents you'd like serviced.
                Our barbers arrive with all tools needed, follow strict hygiene protocols, and treat each resident with care and respect.


                    </p>
                </div>
        </div>
        <div id="Tab2" className={isActiveTab == 'Tab2' ? "TabSection open" : "TabSection"}>
            <div className="FormHowItWorkSection" >
                  <form  method='POST' >
                    <h5>Sign Up Form</h5>
                    <br/>
                    <br/>
                  
                    <div>
                        <label className='labelForm'>Full Name</label><br/>
                        <input type='name' placeholder='Your name' name="name" required/> <br/>
                    </div>
                    <div>
                        <label className='labelForm'> Email</label><br/>
                        <input type='email' placeholder='Your email' name='email'  required/> <br/>
                    </div>
                    <div>
                        <label className='labelForm'> Availability</label><br/>
                        <input type='datetime-local' placeholder='Preferred Date' name='date'  required/> <br/>
                    </div> 
                    <div>
                        <label className='labelForm'> Area of Service</label><br/>
                        <input type='text' placeholder='Area of work' name='ariaOfWork' required/> <br/>
                    </div>
                    <button>Submit</button>
                </form>
                </div>
                
                <div className="TextHowItWorkSection">
    
                    <h3 style={location.pathname === "/about-us" ? {color:'#e99500'}:{}}>Barbers </h3>

                    <p>
               Wayanda CareConnect offers flexible opportunities for licensed barbers to give back and earn by serving seniors in local nursing homes.
                Sign up through our form. Choose your availability and service area.Get matched with facilities near you. You’ll earn per visit, make a difference, and become part of a meaningful network of caregivers.


                    </p>
                </div>
        </div>
    <span className="LineColored1" style={location.pathname === "/about-us" ? {backgroundColor:'#1781eb'}:{}}> </span>
        <span className="LineColored2" > </span>
   </div>
    
)
}

export default HowItWorks;