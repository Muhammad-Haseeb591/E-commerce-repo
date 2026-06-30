import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../assets/components/redux_Toolkit/fetcherSlice";

const New = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.FetchPrducts.products || []);
  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div className='max-lg:w-full min-h-[1000px] mt-[16px] lg:px-[30px] font-sans px-[12px] md:px-[24px] max-w-[1280px] min-[1350px]:max-w-[1800px] mx-auto'>
      <ul className='w-full min-h-[1000px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1350px]:grid-cols-5 gap-[8px] justify-items-center'>
        {products.map((product) => (
          <li key={product._id} className='w-full max-w-[297.693px] h-auto relative cursor-pointer'>

            <div className='bg-[#ececec] flex justify-center items-start w-full h-auto min-h-[190px] sm:min-h-[372.862px] relative'>
              {product.discount && (
                <p className='bg-[#cc0000] text-center text-white text-[14px] w-[84.13px] h-[24.33px] absolute z-40 top-[10px] left-[6px] rounded-[5px] pt-[1px]'>
                   {product.discount}
                </p>
              )}
              <Link to={`/products/${product._id}`} className='overflow-hidden w-full h-full block'>
                <img
                  className='w-full h-full object-cover transition-all duration-600 ease-in-out hover:scale-105'
                  src={product.images?.[0]}
s                  alt={product.name}
                  onError={(e) => console.log("Image broken:", e.target.src)}  // ← broken image ka exact URL
                />
              </Link>
            </div>

            <div className='inline-block w-full h-[82.9px]'>
              <h3 className='w-full'>{product.name}</h3>
              <span className='flex w-full'>
                <p className='mr-[10px] text-red-700'>Rs. {product.price}</p>
                <del>{product.oldPrice}</del>
              </span>
              <div className='mt-[7px] flex items-center'>
                <Link to="/payment" className='inline-block'>
                  <img
                    src="//insignia.com.pk/cdn/shop/t/42/assets/baadmay-short-logo.webp?v=86761914084985923991751264897"
                    alt="BaadMay"
                    width="20"
                    height="20"
                  />
                </Link>
                <p className='inline-block text-[13px] font-bold ml-[5px] tracking-[1px] font-sans'>
                  Pay only Rs. {product.price} now
                </p>
              </div>
            </div>

            {product.bg && (
              <div className={`${product.bg} size-[20px] rounded-[50%] outline outline-black outline-offset-1 m-[2px]`} />
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default New;