import React from 'react';
import coverImgae from "./beaconhouse-school-system-logo-B8DD760BF0-seeklogo.com.png"
import profilrImg from "./360_F_331450336_4R8J1DHNH2xwYrJ8u6wxXcHMnFN8QdgL.jpg"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const AccountSettings = () => {
  return (

    <section>
        <Header/>
    <div className="bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <div className="relative">
          <img 
            src={profilrImg} 
            alt="Cover" 
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <img 
       src={coverImgae}
              alt="Profile" 
              className="w-52 h-52 rounded-full border-4 relative right-60 top-4 border-white shadow-md"
            />
          </div>
        </div>
        <div className="text-center mt-16">
          <h1 className="text-2xl font-semibold">Prince Afful Quansah - Admin</h1>
        </div>
        <form className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="schoolName" className="text-gray-600 md:w-1/4">School Name *</label>
            <input 
              type="text" 
              id="schoolName" 
              className="mt-1 md:mt-0 md:ml-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue="Firm Foundation School - Accra"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="email" className="text-gray-600 md:w-1/4">Email *</label>
            <input 
              type="email" 
              id="email" 
              className="mt-1 md:mt-0 md:ml-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue="arabogar@gmail.com"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="mobileNo" className="text-gray-600 md:w-1/4">Mobile No *</label>
            <input 
              type="text" 
              id="mobileNo" 
              className="mt-1 md:mt-0 md:ml-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue="0204622130"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="city" className="text-gray-600 md:w-1/4">City *</label>
            <input 
              type="text" 
              id="city" 
              className="mt-1 md:mt-0 md:ml-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue="Accra"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="address" className="text-gray-600 md:w-1/4">Address *</label>
            <input 
              type="text" 
              id="address" 
              className="mt-1 md:mt-0 md:ml-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue="Greater Accra"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="username" className="text-gray-600 md:w-1/4">Username *</label>
            <input 
              type="text" 
              id="username" 
              className="mt-1 md:mt-0 md:ml-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue="Prince Afful Quansah"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="password" className="text-gray-600 md:w-1/4">Password *</label>
            <input 
              type="password" 
              id="password" 
              className="mt-1 md:mt-0 md:ml-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue="******"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="language" className="text-gray-600 md:w-1/4">Language *</label>
            <select 
              id="language" 
              className="mt-1 md:mt-0 md:ml-4 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="English"
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          <div className="text-right">
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Save</button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </section>
  );
};

export default AccountSettings;
