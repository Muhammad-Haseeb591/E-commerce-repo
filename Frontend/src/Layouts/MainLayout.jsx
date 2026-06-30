import { Outlet, useLocation } from "react-router-dom";

import Header from "../assets/components/e-Components/Header";
import PromoMessage from "../assets/components/e-Components/PromoMessage";
import FooterNav from "../assets/components/e-Components/FooterNav";
import Footer from "../assets/components/e-Components/Footer";
import Main from "../assets/components/e-Components/Main";

const MainLayout = () => {
  const { pathname } = useLocation();

  const hideMain =
    pathname === "/" ||
    pathname === "/checkout"||
    pathname === "/cart" ||
    pathname.startsWith("/products/");

  return (
    <>
      <Header />
      <PromoMessage />

      {hideMain ? (
        <Outlet />
      ) : (
        <Main>
          <Outlet />
        </Main>
      )}

      <FooterNav />
      <Footer />
    </>
  );
};

export default MainLayout;