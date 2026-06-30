import React from 'react'
import ColorFilter from './ColorFilter'
import ShoesSize from './ShoesSize'

const Filter = ({ onClose }) => {
  return (
    <div className='w-[280px] min-h-screen font-sans bg-white flex flex-col'>

      {/* Header */}
      <div className='flex items-center justify-between px-[20px] py-[18px] border-b border-gray-100'>
        <div className='flex items-center gap-[8px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" d="M4.833 6.5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0ZM4.05 7H2.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h8.55a.5.5 0 0 1 0 1H8.95a2.5 2.5 0 0 1-4.9 0Zm11.117 6.5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0ZM13.5 11a2.5 2.5 0 0 1 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H2.5a.5.5 0 0 1 0-1h8.55a2.5 2.5 0 0 1 2.45-2Z" fill="currentColor"/>
          </svg>
          <span className='text-[13px] font-bold uppercase tracking-[2px]'>Filters</span>
        </div>
        <button
          onClick={onClose}
          className='w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto px-[16px] py-[12px] flex flex-col gap-[8px]'>

        {/* Price Filter */}
        <div className='border border-gray-100 rounded-[8px] px-[16px] py-[12px]'>
          <details open>
            <summary className='list-none cursor-pointer'>
              <div className='flex justify-between items-center pb-[10px] border-b border-gray-100'>
                <span className='text-[13px] font-semibold uppercase tracking-[1px]'>Price</span>
                <svg className='w-[10px] h-[6px]' viewBox="0 0 10 6">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"/>
                </svg>
              </div>
            </summary>

            <p className='text-[12px] text-gray-400 mt-[12px] mb-[8px]'>Highest price is PKR 29,950</p>

            <div className='flex items-center gap-[8px] mt-[8px]'>
              <span className='text-[12px] text-gray-500'>Rs</span>
              <div className='flex-1 relative'>
                <input
                  className='w-full border border-gray-200 rounded-[6px] px-[10px] pt-[18px] pb-[6px] text-[13px] focus:outline-none focus:border-black transition-colors'
                  type="number" placeholder='0' min="0" max="29950"
                />
                <label className='absolute top-[5px] left-[10px] text-[10px] text-gray-400'>From</label>
              </div>
              <span className='text-gray-300'>—</span>
              <div className='flex-1 relative'>
                <input
                  className='w-full border border-gray-200 rounded-[6px] px-[10px] pt-[18px] pb-[6px] text-[13px] focus:outline-none focus:border-black transition-colors'
                  type="number" placeholder='29950' min="0" max="29950"
                />
                <label className='absolute top-[5px] left-[10px] text-[10px] text-gray-400'>To</label>
              </div>
            </div>
          </details>
        </div>

        <ColorFilter />
        <ShoesSize />

      </div>

      {/* Footer — Apply Button */}
      <div className='px-[16px] py-[16px]'>
        <button className='w-full bg-black text-white text-[13px] font-bold uppercase tracking-[2px] py-[12px] rounded-[6px] hover:bg-gray-800 transition-colors duration-200 cursor-pointer'>
          Apply Filters
        </button>
      </div>

    </div>
  )
}

export default Filter