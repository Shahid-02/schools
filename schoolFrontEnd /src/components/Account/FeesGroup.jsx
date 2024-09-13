import React from 'react';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Footer from '../Footer/Footer';


const FeesGroup = () => (
    <div className="min-h-screen bg-gray-100">
    <Header />
    <div className="mt-10 ml-16">
      <h3 className='text-3xl font-extrabold font-sans'>Accounts</h3>
      <hr className='w-20 bg-red-600 h-2 relative bottom-1' />
      <div className='flex pt-2 text-gray-400'>
        Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4' /><span className="text-red-500 pl-3">Fees Group</span>
      </div>
    </div>

  <div className="p-8 bg-gray-100 min-h-screen">
    
    
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800">Fees Group List</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">+ Add Fees Group</button>
      </div>
      <div className="flex justify-end mt-4">
        <input 
          type="text" 
          placeholder="Search..." 
          className="p-2 border rounded-md w-1/4"
        />
      </div>
      
      <table className="mt-6 w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">No.</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Fees Type</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="border p-2">1</td>
            <td className="border p-2">Creche Fees</td>
            <td className="border p-2">
              <div>Feeding Fee - GHS400.00</div>
              <div>Maintenance - GHS200.00</div>
              <div>Tuition - GHS100.00</div>
            </td>
            <td className="border p-2">To be paid every semester</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border p-2">2</td>
            <td className="border p-2">Nursery Fees Group</td>
            <td className="border p-2">
              <div>Feeding Fee - GHS600.00</div>
              <div>Maintenance - GHS400.00</div>
              <div>Tuition - GHS200.00</div>
            </td>
            <td className="border p-2">To be paid every semester</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border p-2">3</td>
            <td className="border p-2">Kindergarten Fees Group</td>
            <td className="border p-2">
              <div>Feeding Fee - GHS500.00</div>
              <div>Maintenance - GHS300.00</div>
              <div>Tuition - GHS100.00</div>
            </td>
            <td className="border p-2">To be paid every semester</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border p-2">4</td>
            <td className="border p-2">Class One Fees Group</td>
            <td className="border p-2">
              <div>Feeding Fee - GHS700.00</div>
              <div>Maintenance - GHS500.00</div>
              <div>Tuition - GHS300.00</div>
            </td>
            <td className="border p-2">To be paid every semester</td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border p-2">5</td>
            <td className="border p-2">Class Two Fees Group</td>
            <td className="border p-2">
              <div>Feeding Fee - GHS800.00</div>
              <div>Maintenance - GHS600.00</div>
              <div>Tuition - GHS400.00</div>
            </td>
            <td className="border p-2">To be paid every semester</td>
          </tr>
        </tbody>
      </table>
    

    <div className="flex justify-end items-center mt-4">
            <button className="py-2 px-4 border rounded-lg">Previous</button>
            <div>
              <button className="py-2 px-4 border rounded-lg mx-1">1</button>
              <button className="py-2 px-4 border rounded-lg mx-1">2</button>
              <button className="py-2 px-4 border rounded-lg mx-1">3</button>
            </div>
            <button className="py-2 px-4 border rounded-lg">Next</button>
          </div>
   </div>
  </div> <Footer/>
  </div>
);

export default FeesGroup;
