import React from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const PromotionForm = () => {
  return (
    <div className=" bg-gray-100 flex">
    
      <div className="flex-1">
        <Header />

    
      <div className="mt-10 ml-16">
<h3 className='text-3xl font-extrabold font-sans'>Students</h3>
<hr className='w-20 bg-red-600 h-2 relative bottom-1' />
<div className='flex  pt-2 text-gray-400'>
  Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4'/><span className="text-red-500 pl-3">Student Admit Form</span>
</div>




            </div>

        <main className="container mt-14 mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              
            </div>
            <h2 className="text-lg font-semibold mb-4">Student Promotion</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
              <div>
                <label className="block text-gray-700">Current Class</label>
                <select className=" mt-1 py-3 px-4 border rounded-lg w-full">
                  <option>Select Class</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Promotion From Class</label>
                <select className="mt-1 py-3 px-4 border rounded-lg w-full">
                  <option>Select Class</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Promotion To Class</label>
                <select className="mt-1 py-3 px-4 border rounded-lg w-full">
                  <option>Select Class</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="mt-8   justify-end space-x-6">
              <button className="bg-red-600 text-white py-3 px-12 hover:bg-red-900 rounded-lg">Save</button>
              <button className="bg-blue-600 text-white py-3 px-12 hover:bg-blue-900 rounded-lg">Reset</button>
            </div>
          </div>
        </main>
      <div className='mt-40'>
        <Footer/>
      </div>
      </div>
    </div>
  );
};

export default PromotionForm;
