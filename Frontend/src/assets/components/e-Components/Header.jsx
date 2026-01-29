import React from 'react'
import Navbar from './Navbar'
import { CiMenuBurger } from "react-icons/ci";
import { useState } from 'react';
import { FiX } from "react-icons/fi";
import Sidebar from './Sidebar'
import { Link } from 'lucide-react';
const Header = () => {
  const [open, setIsOpen] = useState(false);
   const toggleSidebar = () => {
    setIsOpen(!open);
  };   
  return (
    <div className='w-full bg-white  lg:shadow-md lg:shadow-gray-100  sx:h-[95px] px-[17px] pt-[4px]  relative md:top-[40px] lg:h-[106px]'>
        {/*only For Header  */}
    <div className='flex justify-between overflow-hidden items-center w-full sx:h-[48px]'>
        {/* search bar extra */}
        <div className='sx:hidden lg:block size-[25px] mb-[15px]'>
     <button className='ml-[15px] mt-[5px] ' style={{
          position: "absolute",
          left:"0",
          zIndex:"50"
        
        }}>
         <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="25px" height="28px">
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/>
                </svg>
                </button>
                
</div>
<div className='lg:hidden size-[25px] mb-[15px] '>

    {/* sidebar */}

<button  className='lg:hidden ml-[15px] mt-[5px] '  style={{
          overflow:open ? "hidden" : "none",
         
          position: "absolute",
          left:"0",
          zIndex:"50"
        
        }} onClick={toggleSidebar}>
  {open ? <FiX className='fixed top-13 md:right-0 z-50 p-2 rounded-lg bg-white sx:right-0 sx:top-0 transition-colors size-[40px]'/> : <CiMenuBurger className='size-[25px]' />}
{open && <Sidebar style={{ display: open ? "block" : "none" }} />}
 
</button>

</div>
{/* logo */}
<div className='max-w-[200px] relative left-[15px]'>
      <a href="/">< img
  className='logo-responsive
  relative md:left-[45px] '
  src="//insignia.com.pk/cdn/shop/files/final_logo_insignia-01_2847a8f6-7ff7-4e81-ab09-44d3d3fe386e.png?v=1686553684&width=600"
  alt="Insignia PK"
  srcSet="//insignia.com.pk/cdn/shop/files/final_logo_insignia-01_2847a8f6-7ff7-4e81-ab09-44d3d3fe386e.png?v=1686553684&width=200 200w, //insignia.com.pk/cdn/shop/files/final_logo_insignia-01_2847a8f6-7ff7-4e81-ab09-44d3d3fe386e.png?v=1686553684&width=300 300w"
  loading="eager"
/></a>
          </div>
{/* user image + cart */}


<div className='flex justify-between '>
  {/* Location + Sign In */}
          <div className='items-center justify-center relative z-10   w-[95.125px] h-[20px] overflow-none box-border hidden md:block top-[-3px] '>
            <svg className=' w-5 h-5 text-gray-800 relative right-[5px] inline-block' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
            </svg>
            <a href='/' className= 'font-normal text-[12px] relative leading-[2px] text-black/70 '>Store Locator</a>
          </div>
   {/* Cart */}
        <div className='inline-block '>
        <a href="/cart">
        <span className='md:hidden'><svg className='  mr-[6px] size-[25px]' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="w-[25px] h-[25px] text-black/70 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"></path></svg></span>
</a>
        </div>
        {/* user logo */}
         <a href="/account/login" className="header__icon--account full-unstyled-link focus-inset">     
   <span className="large-up-hide medium-hide md:hidden">
            <svg className="icon header_login-icon" viewBox="0 0 22 22" id="profile-picture" width="27" height="27" xmlns="http://www.w3.org/2000/svg">
              <path class="bspinterest-path-1" d="M21 11a10 10 0 01-10 10A10 10 0 011 11 10 10 0 0111 1a10 10 0 0110 10z"></path><path fill="#fff" fill-rule="evenodd" d="M11.01 1A10.014 10.014 0 001 11.01a9.911 9.911 0 002.6 6.707c1.441-.7.921-.12 2.8-.9a22.34 22.34 0 002.4-1.081l.02-1.842a3.532 3.532 0 01-.961-2.282c-.46.14-.6-.521-.641-.941-.02-.4-.26-1.682.3-1.562a10.593 10.593 0 01-.16-2.022 3.69 3.69 0 013.652-3.024c2.5.1 3.483 1.6 3.624 3a10.809 10.809 0 01-.16 2.022c.561-.12.32 1.161.28 1.562-.02.42-.18 1.081-.641.941a3.412 3.412 0 01-.961 2.282l.02 1.822s.46.26 2.4 1.061c1.9.781 1.361.24 2.823.941A9.977 9.977 0 0011.01 1z" class="bspinterest-path-2"></path><path class="bspinterest-path-3" d="M11 .5C5.207.5.5 5.207.5 11S5.207 21.5 11 21.5 21.5 16.793 21.5 11 16.793.5 11 .5zm0 1c5.253 0 9.5 4.247 9.5 9.5s-4.247 9.5-9.5 9.5A9.492 9.492 0 011.5 11c0-5.253 4.247-9.5 9.5-9.5z"></path><path class="bspinterest-path-4" d="M11 1C5.483 1 1 5.483 1 11s4.483 10 10 10 10-4.483 10-10S16.517 1 11 1zm0 1c4.976 0 9 4.024 9 9s-4.024 9-9 9-9-4.024-9-9 4.024-9 9-9z"></path>
            </svg>
          </span>
           <p className='hidden md:block border-l-[1px] h-[20px]  border-gray-400 font-normal text-[12px] pl-[5px] pt-[10px] cursor-pointer leading-[2px] text-black/70  '>Sign in</p>
        </a>
</div>


    </div>
 
<Navbar/>

  </div>
  )
}

export default Header
 