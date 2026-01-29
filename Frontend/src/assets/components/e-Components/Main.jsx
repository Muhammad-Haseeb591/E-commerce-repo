import Filter from './Filter.jsx'
import React, { useState } from 'react'
// import Product from './Product.jsx'
import Sidebar from './Sidebar.jsx'

const Main = () => {
  const [filter, setFilter] = useState(false);
  const toggleFilter = () => {
    setFilter(!filter);
    };

      return (
    <>
      {/* For filter counter and selector */}
<div className='mx-auto w-full  py-[36px] relative md:top-[-43px] lg:top-[2px] '>
<div className='flex justify-between max-lg:w-full h-[58px] items-center py-[10px] px-[20px] outline-1 outline-gray-300 p-[10px] relative '>
  {filter && <Filter style={{ display: 'block' }} />}
  <div>
  <button onClick={toggleFilter}  className='sx:px-[20px] rounded-[5px] sx:border border-black/30 md:border-0 sx:py-[5px]  flex cursor-pointer    ' >
  <span  className=' flex '>
   <svg className="md:hidden size-[25px] icon icon-filter pr-[5px] pt-[3px]" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
  <path fill-rule="evenodd" d="M4.833 6.5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0ZM4.05 7H2.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h8.55a.5.5 0 0 1 0 1H8.95a2.5 2.5 0 0 1-4.9 0Zm11.117 6.5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0ZM13.5 11a2.5 2.5 0 0 1 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H2.5a.5.5 0 0 1 0-1h8.55a2.5 2.5 0 0 1 2.45-2Z" fill="currentColor"></path>
</svg>
<span className='md:tracking-[2px] font-normal md:font-bold  md:uppercase  text-[17px] md:text-[12px] focus:underline-1'>
  Filter
  </span>
  </span>
</button>
  </div>
<div>
  <p className='text-black/70 font-normal hidden md:block'>50 products</p>
</div>

<div className="flex items-center space-x-2">
              
              <div className="relative">
                
                <select className="appearance-none hover:shadow-md hover:shadow-gray-300 hover:border-t-[1px] hover:border-gray-400 cursor-pointer bg-white border-transparent focus:outline-2 focus:outline-black rounded-md px-4 py-2 pr-8 text-sm   relative" aria-selected>
                  <option>Date, new to old</option>
                  <option>Price, low to high</option>
                  <option>Price, high to low</option>
                  <option>Name, A-Z</option>
                  <option>Name, Z-A</option>
                </select>
                <svg className='w-[10px] h-[6px] inline-block relative top-[0px] left-[-26px]' aria-hidden="true" focusable="false" viewBox="0 0 10 6">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor" />
            </svg>
            </div>
            </div>
            </div>
    </div>
    </>
  )
}

export default Main
