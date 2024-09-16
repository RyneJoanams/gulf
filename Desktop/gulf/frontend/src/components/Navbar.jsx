import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown menu state for services

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-teal-500 shadow-lg fixed w-full z-20 top-0 left-0 animate-fadeInDown">
      <div className="container mx-auto px-16 py-10 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-3xl font-extrabold tracking-tight hover:animate-pulse">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Gulf Medical
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex w-[60%] justify-center space-x-6 text-lg">
          <Link
            to="/about"
            className="text-white w-1/6 text-center hover:text-gray-200 relative group transition-all duration-300"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-[30px] h-[3px] bg-white group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </Link>

          {/* Services Dropdown */}
          <div className="relative w-1/6 text-center">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white w-full hover:text-gray-200 relative group transition-all duration-300 focus:outline-none"
            >
              Services
              <span className="absolute bottom-0 left-0 w-[30px] h-[2px] bg-white group-hover:w-full transition-all duration-500 ease-in-out"></span>
              <svg
                className={`w-4 h-4 inline-block ml-2 transition-transform duration-300 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Dropdown Menu */}
            <div
              className={`absolute left-0 mt-2 bg-teal-500 text-white w-full rounded-lg shadow-lg transition-all duration-300 ${
                dropdownOpen ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              <Link
                to="/Front-office"
                className="block px-4 py-2 hover:bg-teal-700 transition duration-300"
                onClick={() => setDropdownOpen(false)}
              >
                Front Office
              </Link>
              <Link
                to="/Accounts"
                className="block px-4 py-2 hover:bg-teal-700 transition duration-300"
                onClick={() => setDropdownOpen(false)}
              >
                Accounts
              </Link>
              <Link
                to="/Phlebotomy"
                className="block px-4 py-2 hover:bg-teal-700 transition duration-300"
                onClick={() => setDropdownOpen(false)}
              >
                Phlebotomy
              </Link>
              <Link
                to="/Laboratory"
                className="block px-4 py-2 hover:bg-teal-700 transition duration-300"
                onClick={() => setDropdownOpen(false)}
              >
                Laboratory
              </Link>
              <Link
                to="/Clinical"
                className="block px-4 py-2 hover:bg-teal-700 transition duration-300"
                onClick={() => setDropdownOpen(false)}
              >
                Clinical
              </Link>
              
            </div>
          </div>

          <Link
            to="/departments"
            className="text-white w-1/6 text-center hover:text-gray-200 relative group transition-all duration-300"
          >
            Departments
            <span className="absolute bottom-0 left-0 w-[30px] h-[2px] bg-white group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </Link>
          <Link
            to="/contact"
            className="text-white w-1/6 text-center hover:text-gray-200 relative group transition-all duration-300"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-[30px] h-[2px] bg-white group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </Link>
          <Link
            to="/admin"
            className="text-white w-1/6 text-center hover:text-gray-200 relative group transition-all duration-300"
          >
            Admin
            <span className="absolute bottom-0 left-0 w-[30px] h-[2px] bg-white group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none hover:scale-110 transform transition duration-300"
            aria-label="Menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-teal-500 transition-all duration-700 ease-in-out transform ${
          isOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-12"
        } overflow-hidden`}
      >
        <div className="flex flex-col space-y-6 py-6 text-center">
          <Link
            to="/about"
            className="text-white text-lg hover:bg-teal-700 py-3 rounded-lg transition duration-300 hover:shadow-lg hover:scale-105 transform"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white text-lg hover:bg-teal-700 py-3 rounded-lg transition duration-300 w-full text-left flex items-center justify-between"
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Mobile Dropdown Menu */}
            <div
              className={`absolute left-0 w-full mt-2 bg-teal-800 text-white rounded-lg shadow-lg transition-all duration-300 ${
                dropdownOpen ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              <Link
                to="/service1"
                className="block px-4 py-2 hover:bg-teal-900 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Service 1
              </Link>
              <Link
                to="/service2"
                className="block px-4 py-2 hover:bg-teal-900 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Service 2
              </Link>
              <Link
                to="/service3"
                className="block px-4 py-2 hover:bg-teal-900 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Service 3
              </Link>
            </div>
          </div>
          <Link
            to="/departments"
            className="text-white text-lg hover:bg-teal-700 py-3 rounded-lg transition duration-300 hover:shadow-lg hover:scale-105 transform"
            onClick={() => setIsOpen(false)}
          >
            Departments
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg hover:bg-teal-700 py-3 rounded-lg transition duration-300 hover:shadow-lg hover:scale-105 transform"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/admin"
            className="text-white text-lg hover:bg-teal-700 py-3 rounded-lg transition duration-300 hover:shadow-lg hover:scale-105 transform"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
