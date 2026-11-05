import { useState,useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { validateSubmission, sendSubmission } from '../lib/booking';

function HowItWorks(){
    const [isActiveTab,setActiveTab] = useState('Tab1');
    const [width,setWidth] = useState(window.innerWidth);
    const toast = useRef(null);
    const form1 = useRef();
    const form2 = useRef();
    const location = useLocation();

    useEffect(()=>{
        function handleResize() {
            setWidth(window.innerWidth);
            
          }
          window.addEventListener("resize", handleResize)
          handleResize();
    },[])

function handleSubmit(e){
    e.preventDefault();
    const formEl = e.currentTarget;
    const kind = formEl.id === 'formTab2' ? 'barber' : 'nursing-home';
    const result = validateSubmission(kind, Object.fromEntries(new FormData(formEl)));
    if (result.bot) { formEl.reset(); return; }
    if (!result.ok) {
        toast.current.show({severity:'error', summary: 'Error', detail: result.error, life: 5000});
        return;
    }
    sendSubmission(result.params).then(
        () => {
            toast.current.show({ severity: 'info', summary: 'Thank you', detail: 'Your information was successfully sent.', life: 5000 });
            formEl.reset();
        },
        () => {
            toast.current.show({severity:'error', summary: 'Error', detail:'Could not send your information. Please try again later or email us.', life: 5000});
        }
    );
}

    return(
    <div id="HowItWorksSection" >
        <PrimeReactProvider>
        <Toast ref={toast} id='ToastNotif' />
        </PrimeReactProvider>
        <div className="TabsButton">
            <span className={isActiveTab == 'Tab1' ? "TabOpen" : ""} onClick={()=>setActiveTab('Tab1')}><button>For Nursing Homes </button></span>
           <span className={isActiveTab == 'Tab2' ? "TabOpen" : ""} onClick={()=>setActiveTab('Tab2')}><button> For Barbers</button></span>
        </div>
        <div id="Tab1"  className={isActiveTab == 'Tab1' ? "TabSection open" : "TabSection"}>
                <div className="FormHowItWorkSection" >
                  <form id='formTab1' method='POST' ref={form1} onSubmit={(e)=>handleSubmit(e)}>
                    <h5>Booking Form</h5>
                    <br/>
                    <br/>
                    <div>
                        <label className='labelForm'>Full Name</label><br/>
                        <input type='name' placeholder='Your name' name="name" required/> <br/>
                        <input type='hidden' name='clientType' value='Nursing Home'/>
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
                        <input type='number' min='1' max='30'  name='numberOfResident' placeholder='Resident numbers to serve' required/> <br/>
                    </div>
                    <button type="submit" >Submit</button>
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
                  <form  method='POST' id='formTab2' ref={form2} onSubmit={(e)=>handleSubmit(e)}>
                    <h5>Sign Up Form</h5>
                    <br/>
                    <br/>
                  
                    <div>
                        <label className='labelForm'>Full Name</label><br/>
                        <input type='name' placeholder='Your name' name="name" required/> <br/>
                        <input type='hidden' name='clientType' value='Barber'/>
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