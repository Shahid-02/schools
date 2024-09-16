import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const StudentsData = () => {
  const [parents, setParents] = useState([]);
  const [filteredParents, setFilteredParents] = useState([]);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(() => {
    const fetchParents = async () => {
      try {
        // localStorage.setItem('token', token);

        const response = await axios.get(`http://localhost:3000/parents/${pageNumber}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        
        console.log(response.data)
        // Ensure the response is an array
        if (Array.isArray(response.data.data)) {
          setParents(response.data.data);
          setFilteredParents(response.data.data); // Set both state variables
          setTotalPages(response.data.totalPages)
          console.log( totalPages);
          
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        console.error("Error fetching parents data: ", error);
        setError('Error fetching parents data');
      }
    };

    fetchParents();
  }, [pageNumber]);

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setFilteredParents(parents); // Show all data if the search input is cleared
    } else {
      const filtered = parents.filter(parent =>
        parent.fatherName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredParents(filtered);
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const nextPageHandle = async () => {
    if (pageNumber < totalPages) {  
      setPageNumber(pageNumber + 1); 
    }
  };
  
  const previousPageHandle = async () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };



  return (
    <div className=" bg-gray-100">
      <Header />
      <div className="mt-10 ml-16">
        <h3 className='text-3xl font-extrabold font-sans'>Parents</h3>
        <hr className='w-20 bg-red-600 h-2 relative bottom-1' />
        <div className='flex pt-2 text-gray-400'>
          Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4' /><span className="text-red-500 pl-3">All Parents</span>
        </div>
      </div>
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Parents Data</h2>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Search by name..."
              className="py-2 px-4 border border-4 rounded-lg w-1/3 mr-10"
            />
            <button onClick={handleSearch} className="bg-red-600 text-white py-2 px-20 ml-8 rounded-lg">SEARCH</button>
          </div>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="min-w-full bg-white text-left">
            <thead>
              <tr className="text-red-600">
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Religion</th>
                <th className="p-2 border-b">Occupation</th>
                <th className="p-2 border-b">Email</th>
                <th className="p-2 border-b">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredParents.map((parent, index) => (
                <tr key={index} className="">
                  <td className="p-2 relative border-b">{parent.id}</td>
                  <td className="p-2 relative border-b">{parent.fatherName}</td>
                  <td className="p-2 relative border-b">{parent.religion}</td>
                  <td className="p-2 relative border-b">{parent.fatherOccupation}</td>
                  <td className="p-2 relative border-b">{parent.email}</td>
                  <td className="p-2 relative border-b">{parent.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
          <div className="flex justify-end items-center mt-4">
            <button className="py-2 px-4 border rounded-lg" onClick={previousPageHandle}>Previous</button>
            <div className="mx-4">{pageNumber} of {totalPages}</div>
            <button className="py-2 px-4 border rounded-lg" onClick={nextPageHandle}>Next</button>
          </div>
        </div>
      </main>
      <div className='mt-64'>
        <Footer/>
      </div>
    </div>
  );
};

export default StudentsData;
