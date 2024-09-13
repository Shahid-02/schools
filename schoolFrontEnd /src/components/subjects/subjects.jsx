




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const SubjectComponent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students');
        // Ensure the response is an array
        if (Array.isArray(response.data.user)) {
          setStudents(response.data.user);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        console.error("Error fetching students data: ", error);
        setError('Error fetching students data');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className=" bg-gray-100">
      <Header />
      <div className="mt-10 ml-16">
        <h3 className='text-3xl font-extrabold font-sans'>Subjects</h3>
        <hr className='w-20 bg-red-600 h-2 relative bottom-1' />
        <div className='flex pt-2 text-gray-400'>
          Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4' /><span className="text-red-500 pl-3">Subjects</span>
        </div>
      </div>
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Subjects</h2>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="py-2 px-4 border rounded-lg w-1/3 mr-10"
            />
            <select className="py-2 px-4 border rounded-lg w-1/3 mr-4">
              <option>Select Class</option>
              {/* Add class options here */}
            </select>
            <button className="bg-red-600 text-white py-2 px-20 ml-8 rounded-lg">SEARCH</button>
          </div>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="mt-6 w-full text-left border-collapse">
  <thead>
    <tr className='text-red-500 text-xl'>
      <th className="border-t border-b border-l p-2 pb-6 text-center">Subject Name</th>
      <th className="border-t border-b p-2 pb-6 text-center">Teacher</th>
      <th className="border-t border-b p-2 pb-6 text-center">Classes</th>
      <th className="border-t border-b border-r p-2 pb-6 text-center">Days</th>
    </tr>
  </thead>
  <tbody>
    <tr className="hover:bg-gray-100">
      <td className="border-t border-b border-l p-2 text-center align-middle">English</td>
      <td className="border-t border-b p-2 text-center align-middle">Ali Hussain</td>
      <td className="border-t border-b p-2 text-center align-middle">1, 2 & 7</td>
      <td className="border-t border-b border-r p-4 text-center align-middle">Mon, Tue & Fri</td>
    </tr>
    <tr className="hover:bg-gray-100">
      <td className="border-t border-b border-l p-2 text-center align-middle">Maths</td>
      <td className="border-t border-b p-2 text-center align-middle">Daniel Grant</td>
      <td className="border-t border-b p-2 text-center align-middle">6 & JHS1</td>
      <td className="border-t border-b border-r p-6 text-center align-middle">Mon, Tue & Fri</td>
    </tr>
    <tr className="hover:bg-gray-100">
      <td className="border-t border-b border-l p-2 text-center align-middle">French</td>
      <td className="border-t border-b p-2 text-center align-middle">Daniel Grant</td>
      <td className="border-t border-b p-2 text-center align-middle">1, 2 & 4</td>
      <td className="border-t border-b border-r p-4 text-center align-middle">Mon, Tue & Fri</td>
    </tr>
    <tr className="hover:bg-gray-100">
      <td className="border-t border-b border-l p-4 text-center align-middle">Science</td>
      <td className="border-t border-b p-2 text-center align-middle">Daniel Grant</td>
      <td className="border-t border-b p-2 text-center align-middle">6 & JHS1</td>
      <td className="border-t border-b border-r p-2 text-center align-middle">Mon, Tue & Fri</td>
    </tr>
    <tr className="hover:bg-gray-100">
      <td className="border-t border-b border-l p-2 text-center align-middle">Arts</td>
      <td className="border-t border-b p-2 text-center align-middle">Daniel Grant</td>
      <td className="border-t border-b p-2 text-center align-middle">1, 2 & 4</td>
      <td className="border-t border-b border-r p-4 text-center align-middle">Mon, Tue & Fri</td>
    </tr>
  </tbody>
</table>

          )}
          <div className="flex justify-end mt-4">
            <button className="py-2 px-4 border rounded-lg">Previous</button>
            <div>
              <button className="py-2 px-4 border rounded-lg mx-1">1</button>
              <button className="py-2 px-4 border rounded-lg mx-1">2</button>
              <button className="py-2 px-4 border rounded-lg mx-1">3</button>
            </div>
            <button className="py-2 px-4 border rounded-lg">Next</button>
          </div>
        </div>



           <div className=" bg-gray-100 mt-8 p">
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-sans">Add New Subject</h2>
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Subject Name*</label>
                <input type="text"  className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Teacher</label>
                <input type="text"  className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Classes</label>
                <input type="text"  className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Days</label>
                <input type="text"  className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>
          
            </div>
            <div className="mt-8 pb-11   space-x-4">
            <button className="bg-red-600 hover:bg-red-900 text-white py-3 px-12 rounded-lg">Save</button>
            <button className="bg-blue-600 hover:bg-blue-900 text-white py-3 px-12 rounded-lg">Reset</button>
          </div>
            </div>
            </div>
      </main>


      
      <div className='mt-14'>
        <Footer/>
      </div>
    </div>
  );
};

export default SubjectComponent;
