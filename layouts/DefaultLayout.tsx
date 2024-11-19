import "./default.scss";
import React from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-11/12 lg:max-w-[112rem]  flex flex-col lg:justify-center mx-auto ">
      {children}
    </div>
  );
};

export default DefaultLayout;
