import "../styles/components/Header.scss";
import Place from "./Place";
import Search from "./Search";
import Setting from "./Setting";
import React from "react";

function Header() {
  return (
    <div className="Header">
      <Place />
      <Search />
      <Setting />
    </div>
  );
}

export default Header;
