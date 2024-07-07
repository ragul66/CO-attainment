import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/nothinglogo.jpg";
import profile from "../assets/profile.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkLogin = () => {
      if (!user) {
        navigate("/");
      }
    };
    checkLogin();
  }, [navigate, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onExit = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="bg-sky-600 p-3 items-center flex flex-row w-screen gap-6 relative">
      <img
        className="ml-12 cursor-pointer size-12 rounded-full"
        src={logo}
        alt="SITLOGO"
      />
      <div className="flex flex-row gap-6 justify-center items-center font-bold text-white cursor-pointer">
        <h2 onClick={() => navigate(`/namelists`)}>Namelist</h2>
        <h2 onClick={() => navigate("/courses")}>Course</h2>
        <h2 onClick={() => navigate("/ptlists")}>ptLists</h2>
        <h2 onClick={() => navigate("/saa")}>Saa</h2>
      </div>
      <div
        className="ml-auto relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={dropdownRef}
      >
        <img className="cursor-pointer" src={profile} alt="Profile" />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
            <div
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/ptlists")}
            >
              Create Co
            </div>
            <div
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
              onClick={onExit}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;