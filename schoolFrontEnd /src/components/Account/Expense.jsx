




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Expenses = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/parents/create');
        console.log(response)
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
        <h3 className='text-3xl font-extrabold font-sans'>Account</h3>
        <hr className='w-20 bg-red-600 h-2 relative bottom-1' />
        <div className='flex pt-2 text-gray-400'>
          Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4' /><span className="text-red-500 pl-3">Expenses</span>
        </div>
      </div>
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All  Expenses Data</h2>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="py-2 px-4 border rounded-lg w-1/3 mr-10"
            />
            <select className="py-2 px-4 border rounded-lg w-1/3 mr-4">
              <option>Select Class</option>
              <option>Class 1</option>
              <option>Class 2</option>
              {/* Add class options here */}
            </select>

            <select className="py-2 px-4 border rounded-lg w-1/3 mr-4">
              <option>Select Status</option>
              <option>Paid</option>
              <option>Unpaid</option>
            </select>
            <button className="bg-red-600 text-white py-2 px-20 ml-8 rounded-lg">SEARCH</button>
          </div>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className='text-red-600'>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Gender</th>
                  <th className="py-2 px-4 border-b">Class</th>
                  <th className="py-2 px-4 border-b">Parents</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Date of Birth</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                  <td className="py-2 px-4 relative left-4 border-b">{student.id}</td>
                  <td className="py-2 px-4 relative left-8 border-b">{student.Name}</td>
                  <td className="py-2 px-4 relative left-7 border-b">{student.Gender}</td>
                  <td className="py-2 px-4 relative left-7 border-b">{student.Class}</td>
                  <td className="py-2 px-4 relative left-14 border-b">{student.parent.FatherName}</td>
                  <td className="py-2 px-4 relative left-12 border-b">{student.Address}</td>
                  <td className="py-2 px-4 relative left-11 border-b">{student.DateOfBirth}</td>
                  <td className="py-2 px-4 relative left-8 border-b">{student.parent.PhoneNumber}</td>
                </tr>
                ))}
              </tbody>
            </table>
          )}
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
      </main>
      <div className='mt-64'>
        <Footer/>
      </div>
    </div>
  );
};

export default Expenses;
