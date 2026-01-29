import React from 'react'
import NewShoes from '../../images/NewShoes.jpg'
import LadiesShoes from '../../images/LadiesShoes.jpg'
import MenShoes from '../../images/MensShoes.jpg'
import { IoBagOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { BrowserRouter as Router, Routes, Route, NavLink,Link } from "react-router-dom";

const Navbar = () => {

const navLinks = [
    {
    to: "/",
    },{
    name: "NEW",
    to: "/new",
    hoverImage: NewShoes,
    hoverDetails: [
      { section: "NEW ARRIVALS", items: [
      { label: "WOMEN'S NEW ARRIVALS", to: "/women" },
      { label: "MEN'S NEW ARRIVALS", to: "/men" },
    ]
    }
    ],
  },
  {
    name: "WOMEN",
    to: "/women",
    hoverImage: LadiesShoes,
    hoverDetails: [
      {
        section: "SHOES",
        items: [
          { label: "SLIP ON", to: "/women/slip-on" },
          { label: "SANDALS", to: "/women/sandals" },
          { label: "SLING BACK", to: "/women/sling-back" },
          { label: "FLIP FLOP", to: "/women/flip-flop" },
          { label: "COURT SHOES", to: "/women/court-shoes" },
          { label: "PUMPS", to: "/women/pumps" },
        ],
      },
      {
        section: "BAGS",
        items: [
          { label: "SLIP ON", to: "/women/bags/slip-on" },
          { label: "COURT SHOES", to: "/women/bags/court-shoes" },
          { label: "SANDALS", to: "/women/bags/sandals" },
          { label: "SLING BACK", to: "/women/bags/sling-back" },
          { label: "PUMPS", to: "/women/bags/pumps" },
          { label: "FLIP FLOP", to: "/women/bags/flip-flop" },
        ],
      },
    ],
  },
  {
    name: "MEN",
    to: "/men",
    hoverImage: MenShoes,
    hoverDetails: [
      {
        section: "SHOES",
        items: [
          { label: "SLIP ON", to: "/men/slip-on" },
          { label: "SANDALS", to: "/men/sandals" },
          { label: "SLING BACK", to: "/men/sling-back" },
          { label: "FLIP FLOP", to: "/men/flip-flop" },
          { label: "COURT SHOES", to: "/men/court-shoes" },
          { label: "PUMPS", to: "/men/pumps" },
        ],
      },
    ],
  },
  {
    name: "KIDS",
    to: "/kids",
    hoverDetails: [
      {
        section: "GIRLS",
        items: [
          { label: "SANDALS", to: "/kids/girls/sandals" },
          { label: "SLING BACK", to: "/kids/girls/sling-back" },
          { label: "FLIP FLOP", to: "/kids/girls/flip-flop" },
          { label: "COURT SHOES", to: "/kids/girls/court-shoes" },
          { label: "PUMPS", to: "/kids/girls/pumps" },
        ],
      },
      {
        section: "BOYS",
        items: [
          { label: "SANDALS", to: "/kids/boys/sandals" },
          { label: "SLING BACK", to: "/kids/boys/sling-back" },
          { label: "FLIP FLOP", to: "/kids/boys/flip-flop" },
          { label: "COURT SHOES", to: "/kids/boys/court-shoes" },
          { label: "PUMPS", to: "/kids/boys/pumps" },
        ],
      },
    ],
  },
  {
    name: "FRAGRANCES",
    to: "/fragrances",
    hoverDetails: [
      { items: [
        { label: "FOR HIM", to: "/fragrances/men" },
        { label: "FOR HER", to: "/fragrances/women" },
        { label: "BODY MIST", to: "/fragrances/body-mist" },
      ]},
    ],
  },
  {
    name: "ACCESSORIES",
    to: "/accessories",
    hoverDetails: [],
  },
  {
    name: "GET INSPIRED",
    to: "/getinspired",
    hoverDetails: [
      {
        section: "BOYS",
        items: [
          { label: "SANDALS", to: "/getinspired/boys/sandals" },
          { label: "SLING BACK", to: "/getinspired/boys/sling-back" },
          { label: "FLIP FLOP", to: "/getinspired/boys/flip-flop" },
          { label: "COURT SHOES", to: "/getinspired/boys/court-shoes" },
          { label: "PUMPS", to: "/getinspired/boys/pumps" },
        ],
      },
    ],
  },
  {
    name: "SALES",
    to: "/sales",
    text: "text-red-600",
    hoverDetails: [
      { items: [
        { label: "FLAT 50% OFF", to: "/sales/50" },
        { label: "FLAT 70% OFF", to: "/sales/70" },
      ]},
    ],
  },
];


  return (
<div className="w-full h-[41px] flex justify-center flex-wrap font-sans">
  {/* links */}
  <div className="flex-1 flex justify-center ">
    <ul className="relative left-[110px] list-none lg:flex mt-[10px] lg:w-[634.75px] h-[40.9px] flex-wrap justify-center hidden ">
      {navLinks.map((link, i) => (
        <li
          key={i}
          className="relative group w-fit font-normal text-[14px] hover:font-semibold text-black/70 hover:text-black/100 cursor-pointer tracking-[-0.5px] p-[10px]"
        >
          <NavLink to={link.to} className={`${link.text}`}>
            {link.name}
          </NavLink>
          {link.hoverDetails?.length > 0 && (
            <div className="border-t-[0.5px] border-b-[0.5px] border-gray-200 absolute top-[42px] overflow-hidden left-[-316px] group-hover:flex flex-col bg-white pt-3 rounded z-50 lg:w-[1263px] h-[37.6rem] hidden">
              {link.hoverImage && (
                <img
                  src={link.hoverImage}
                  alt={link.name}
                  className="absolute w-[46.5vw] h-[100vh] right-[30px] mt-[9px] rounded-md"
                />
              )}
              <div className="grid grid-cols-2 gap-4 w-[50%] h-[100vh] pl-[30px] mt-[10px]">
                {link.hoverDetails.map((section, idx) => (
                  <div key={idx}>
                    {section.section && <h3>{section.section}</h3>}
                    {section.items?.map((item, j) => (
                      <Link
                        key={j}
                        to={item.to}
                        className="hover:text-black/100 text-black/70 hover:text-[14px] font-normal hover:font-medium cursor-pointer block mb-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
{/* form */}
{/* form */}
<div className=' sx:w-full  lg:w-[220px]  lg:h-[32px] lg:flex lg:justify-start lg:items-center lg:relative lg:top-[17px] '>
<form action="/submit" className='sx:w-full lg:w-[160px ] lg:h-[33px] mb-[10px] sx:mx-auto md:hidden lg:block lg:relative  '>
  <div className='relative sx:w-full '>
    <input 
      className='bg-[#eeeeee] sx:w-full h-[47px] px-5 pr-12 lg:outline-1 outline-gray-300 border-gray-300 rounded-[5px] text-[13px] text-black/100 border-[1px] absolute outline-1  lg:text-[13px] lg:w-[157.33px] lg:h-[30px] lg:p-[5px]  max:md:relative ' 
      type="search" 
      placeholder='Search for...'
    />
    <div className='lg:inline-block lg:relative lg:top-[4px] lg:right-[-130px] sx:absolute sx:right-3 sx:top-[13px]  '>
    <button 
      type="submit" 
      className=' cursor-pointer'
      aria-label="Search"
    >
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 40 40" 
  width="25px" 
  height="28px"
  className="text-black/60"
>
  <path 
    fill="currentColor"
    d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
  />
</svg>
    </button>
    
</div>
  </div>
</form>

{/* Favourite logo */}
            <div className='hidden lg:block w-[27px] h-[27px] relative lg:left-[4px] lg:top-[-6px] ml-[35px] cursor-pointer '>
            <CiHeart className='size-[30px] inline-block' />
            </div>
{/* Cart logo */}
            <div className='inline-block size-[25px]  mr-[5px] cursor-pointer relative left-[8px] top-[-7px] ' >
         <Link to="/cart"> <span className='hidden lg:block'><svg className='  mr-[6px] size-[25px]' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="w-[25px] h-[25px] text-black/70 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"></path></svg></span></Link>

     </div>
     </div>
</div>
   
  )
}

export default Navbar
