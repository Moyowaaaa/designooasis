import React from "react";
// import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PageContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-h-screen overflow-hidden">
      <Navbar />
      <div className="pt-[1rem]">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default PageContentLayout;
