import React from "react";
import Logo from "../MovieLogo.jpg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex border space-x-8 items-center pl-3 py-4">
      <img className="w-[60px]" src={Logo} alt="Movie Logo" />
      <Link to="/" className="text-blue-500 text-3xl font-bold">
        Movies
      </Link>
      <Link to   ="/watchlist" className="text-blue-500 text-3xl font-bold">
        Watch List
      </Link>
    </div>
  );
};

export default NavBar;
