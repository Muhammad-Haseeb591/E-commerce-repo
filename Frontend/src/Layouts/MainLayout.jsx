import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../assets/components/e-Components/Header.jsx'
import PromoMessage from '../assets/components/e-Components/PromoMessage.jsx'
import FooterNav from '../assets/components/e-Components/FooterNav.jsx'
import Footer from '../assets/components/e-Components/Footer.jsx'
// import Main from '../assets/components/Main.jsx'
// import Product from '../assets/components/Product.jsx'
const MainLayout = () => {
  return (
    <div>
        <Header/>
        <PromoMessage/>
        {/* {location.pathname !== '/' && <Main />} */}
        {/* <Product/> */}
        <Outlet/>
        <FooterNav/>
        <Footer/>
    </div>
  )
}

export default MainLayout
