import React, { useState } from 'react';
import { FaBell, FaEnvelope,} from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import 'tailwindcss/tailwind.css';
import profile from './pic.jpg';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-white shadow flex items-center relative bottom-3  justify-between px-4 sm:px-6 lg:px-8 h-20">
      <div className="flex items-center">
        <button className="text-red-600 text-2xl">
          <BiSearch />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="ml-2 py-2 px-4 border rounded-lg w-64"
        />
      </div>
      <div className="flex items-center space-x-4 ">
        <button className="text-red-600 text-2xl">
          <FaEnvelope />
        </button>
        <button className="text-red-600 text-2xl">
          <FaBell />
        </button>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-red-600 text-2xl focus:outline-none"
          >
            <span className="ml-2">
              <img className="rounded-full h-12 w-12" src={profile} alt="Profile" />
            </span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-4">
              <img className="rounded-md" src={profile} alt="Profile" />
              <h1 className='ml-20 text-red-600 pt-3 text-2xl'>Hi cartoon</h1>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
