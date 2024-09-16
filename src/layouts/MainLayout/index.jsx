import "./styled.scss";

import Header from "@/Components/Header";

import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="container-main-layout">
      {/* <Header /> */}
      {children}
    </div>
  );
};

export default MainLayout;
