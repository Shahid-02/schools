import React from 'react';
import 'tailwindcss/tailwind.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const AddExpenses = () => {
  return (
    <section className='bg-gray-100'> 
      <Header />

      <div>
      <div className="mt-10 ml-16">
<h3 className='text-3xl font-extrabold font-sans'>Account</h3>
<hr className='w-20 bg-red-600 h-2 relative bottom-1' />
<div className='flex  pt-2 text-gray-400'>
  Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4'/><span className="text-red-500 pl-3">Add Expenses</span>
</div>




            </div>

      </div>
      <div className=" bg-gray-100 mt-8 p-4">
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Add New Expenses</h2>
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Name * </label>
                <input type="text"  className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700  ">Expenses Type *</label>
                <select className=" mt-1 py-3 px-4 border rounded-lg w-full">
                  <option>Select Expenses</option>
                
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700  ">Status</label>
                <select className=" mt-1 py-3 px-4 border rounded-lg w-full">
                  <option>Select Status</option>
                  <option>paid</option>
                  <option>UnPaid</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Amount * </label>
                <input type="text"  className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>



            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Phone</label>
                <input type="text"  className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>

           


            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">E-mail  address</label>
                <input type="text"  className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>


            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Due Date</label>
                <input type="date" className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>


            

      

          
          </div>

         

          <div className="mt-8 flex items-center">
            <div className="relative w-full md:w-1/2">
              <label className="block text-gray-700">Upload Student Photo</label>
              <input type="file" className="mt-1 py-2 px-4 border rounded-lg w-full" />
            </div>
          </div>

          <div className="mt-8  space-x-4">
            <button className="bg-red-600 hover:bg-red-900 text-white py-3 px-12 rounded-lg">Save</button>
            <button className="bg-blue-600 hover:bg-blue-900 text-white py-3 px-12 rounded-lg">Reset</button>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <Footer/>
      </div>
    </section>
  );
};

export default AddExpenses;
