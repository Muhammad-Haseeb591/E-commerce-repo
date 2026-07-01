import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchData } from '../assets/components/redux_Toolkit/fetcherSlice'
const Fragrances = () => {
 const dispatch = useDispatch()
  const selector = useSelector((state) => state.FetchPrducts.products || [])
  const products = selector.filter((product) => product.category === "fragrances")
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  return (
    <>
    <div className='max-lg:w-full min-h-[1000px] mt-[16px] lg:px-[30px] font-sans px-[12px] md:px-[24px] max-w-[1280px] min-[1350px]:max-w-[1800px] mx-auto'>
    <ul className='w-full min-h-[1000px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1350px]:grid-cols-5 gap-[8px] justify-items-center'>
      {products.map((product) => {
        return (
          <li key={product._id} className='w-full max-w-[297.693px] h-auto relative cursor-pointer'>
            <div className='bg-[#ececec] flex justify-center items-start w-full h-auto min-h-[190px] sm:min-h-[372.862px]'>
              <p className='bg-[#cc0000] text-center text-white text-[14px] w-[84.13px] h-[24.33px] absolute z-40 inline-block top-[10px] left-[6px] rounded-[5px] pt-[1px]'>{product.discount}</p>
              <Link to="/women-shoes" className='overflow-hidden w-full h-full'>
                <img className='w-full h-full object-cover relative transition-all duration-600 ease-in-out hover:scale-105' src={product.image} alt="ladies-Shoes" />
              </Link>
            </div>
            <div className='inline-block w-full h-[82.9px]'>
              <h3 className='w-full'>{product.name}</h3>
              <span className='flex font-size-[1rem] w-full'>
                <p className='mr-[10px] text-red-700'>{product.price}</p>
                <del>{product.oldPrice}</del>
              </span>
            </div>
            <div className={`${product.bg} size-[20px] rounded-[50%] outline outline-black outline-offset-1 m-[2px]`}></div>
          </li>
        )
      })}
    </ul>
  </div> 
    </>
  )
}

export default Fragrances
