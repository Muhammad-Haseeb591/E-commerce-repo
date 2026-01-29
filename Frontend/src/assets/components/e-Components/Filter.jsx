import React from 'react'
import ColorFilter from './ColorFilter'
import ShoesSize from './ShoesSize'

const Filter = () => {
  return (
    <div className='w-[290px] min-h-[911px] font-sans relative bg-white top-[420px] left-[-20px] pr-[25px] z-30 hidden md:block'>
    <div className='w-[260px] h-[37.5px] px-[10px] flex-start' >Filter: </div>
      <div className='flex box-border w-[250px] max:h-[198.33px] py-[10px] px-[20px] border-[1px] rounded-[5px] m-[5px] border-gray-200 '>
        <details className=' box-border'>
<summary className='list-none pt-[15px] pb-[5px] pr-[17.5px]'>
  <div className='flex  border-b-[1px] border-gray-200'>
<span className=' w-[191.17px] h-[29px] flex  justify-between item-center  '>Price
            <svg className='rotate-180 w-[20px] h-[6px] mt-[9px] ' aria-hidden="true" focusable="false" viewBox="0 0 10 6">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor" />
            </svg> </span></div>
</summary>
  <p>The highest price is PKR 29,950</p>
<div  className='w-full h-[57px] flex mt-[20px] ' >
  
<div className='mr-[6px] mt-[10px] inline-block'>Rs</div>
<div className='inline-block w-[85.91px] h-[47px] '>
<div className='w-[85.91px] h-[47px]'>
<input className='relative border-1 w-[83.91px] h-[45px] list-none px-[15px] pt-[30px] pb-[15px] m-[1px]'  type = "number" placeholder='0' min="0" max="29950"  />
</div>
<label htmlFor="" className='relative top-[-48px] left-[20px]' >From</label></div>


<div className='inline-block'>
<div className='w-[85.91px] h-[47px]'>
<input className='relative border-1 w-[83.91px] h-[45px] list-none px-[15px] pt-[30px] pb-[15px] m-[1px]'  type = "number" placeholder='29950' min="0" max="29950"  />
</div>
<label htmlFor="" className='relative top-[-48px] left-[20px]' >To</label></div>
</div>
</details>
      </div>

      <ColorFilter/>
  <ShoesSize/>
    </div>
  )
}

export default Filter
