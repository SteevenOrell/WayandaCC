import {Link, useLocation,Outlet} from 'react-router-dom'

function Footer(){
    return(
<footer id="Footer2" class="w-full">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full">
                <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                    <a href="#"  class="flex justify-center lg:justify-start">
                    <h4 class="text-lg text-gray-900 font-medium mb-7">WCC</h4>
                    </a>
                    <p class="text-sm text-gray-700 leading-6 mb-7">We make personal care mobile, professional and rooted in respect.</p>
     
                </div>
                <div class="lg:mx-auto text-left">
                    <h4 class="text-lg text-gray-900 font-medium mb-7">Legal & Trust Notes</h4>
                    <p class="text-sm text-gray-700 leading-6 mb-7">All barbers are vetted and adhere to our hygiene and dignity-first care policy. We value your trust.</p>

                </div>
                <div class="lg:mx-auto text-left ">
                    <h4 class="text-lg text-gray-900 font-medium mb-7">Other Links</h4>
                    <ul class="text-sm  transition-all duration-500">
                        <li class="mb-6"><Link to="/"  class="text-gray-600 hover:text-gray-900">Home</Link></li>
                        <li class="mb-6"><Link to="/about-us"  class=" text-gray-600 hover:text-gray-900">About Us</Link></li>
                        <li><Link to="/#PricingSection"  class=" text-gray-600 hover:text-gray-900">Pricing</Link></li>
                    </ul>
                </div>
                
                <div class="lg:mx-auto text-left ">
                    <h4 class="text-lg text-gray-900 font-medium mb-7">Contact Us </h4>
                    <ul class="text-sm  transition-all duration-500">
                        <li class="mb-6"><a href="mailto:wayandacareconnect@gmail.com"  class="text-gray-600 hover:text-gray-900">Business Email</a></li>
                        {/* <li class="mb-6"><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900"></a></li> */}
                        {/* <li><a href="javascript:;"  class=" text-gray-600 hover:text-gray-900"></a></li> */}
                    </ul>
                </div>

               

            </div>
            
            <div class="py-7 border-t border-gray-200">
                <div class="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                    <span class="text-sm text-gray-500 ">©<Link to="/">WCC </Link> {new Date().getFullYear()}, All rights reserved.</span>
        
                </div>
            </div>
        </div>
        <Outlet/>
    </footer>)
}

export default Footer