import { Outlet, useLocation } from "react-router-dom";

import Header from "../assets/components/e-Components/Header";
import PromoMessage from "../assets/components/e-Components/PromoMessage";
import FooterNav from "../assets/components/e-Components/FooterNav";
import Footer from "../assets/components/e-Components/Footer";
import Main from "../assets/components/e-Components/Main";

const MainLayout = () => {
  const { pathname } = useLocation();

  // jin paths pe sab kuch hide hona hai (sirf Outlet dikhega)
  const minimalLayoutPaths = ["/checkout", "/signup", "/login", "/forgot-password","/admin/dashboard"];
  const isMinimalLayout = minimalLayoutPaths.includes(pathname);

  const hideMain =
    pathname === "/" ||
    pathname === "/cart" ||
    pathname === "/favourites"||
    pathname.startsWith("/products/") ||
    isMinimalLayout;

  if (isMinimalLayout) {
    return <Outlet />;
  }

  return (
    <>
      <Header />
      <PromoMessage />
      {hideMain ? <Outlet /> : <Main><Outlet /></Main>}
      <FooterNav />
      <Footer />
    </>
  );
};

export default MainLayout;