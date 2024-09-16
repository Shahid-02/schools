import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ParentsData = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // State for page number
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/students/${pageNumber}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        console.log(response.data);

        if (Array.isArray(response.data.data)) {
          setStudents(response.data.data);
          setFilteredStudents(response.data.data);
          setTotalPages(response.data.totalPages); // Set the total pages from response
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching students data: ", error);
        setError("Error fetching students data");
      }
    };

    fetchStudents();
  }, [pageNumber]); // Trigger fetch when pageNumber changes

  const handleSearch = () => {
    const filtered = students.filter((student) => {
      return (
        student.name.toLowerCase().startsWith(searchTerm.toLowerCase()) && 
        (selectedClass === "" || student.class === selectedClass)
      );
    });
    setFilteredStudents(filtered);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1); // Increase page number
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1); // Decrease page number
    }
  };

  return (
    <div className=" bg-gray-100">
      <Header />
      <div className="mt-10 ml-16">
        <h3 className="text-3xl font-extrabold font-sans">Students</h3>
        <hr className="w-20 bg-red-600 h-2 relative bottom-1" />
        <div className="flex pt-2 text-gray-400">
          Home{" "}
          <MdOutlineKeyboardArrowRight className="size-6 text-red-500 ml-4" />
          <span className="text-red-500 pl-3">All Students</span>
        </div>
      </div>
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Students Data</h2>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="py-2 px-4 border rounded-lg w-1/3 mr-10"
              value={searchTerm}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setSearchTerm(e.target.value);
                }
              }}
            />

            <button
              className="bg-red-600 text-white py-2 px-20 ml-8 rounded-lg"
              onClick={handleSearch}
            >
              SEARCH
            </button>
          </div>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="min-w-full bg-white text-left">
            <thead>
              <tr className="text-red-600">
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Gender</th>
                <th className="p-2 border-b">Class</th>
                <th className="p-2 border-b">Parents</th>
                <th className="p-2 border-b">Address</th>
                {/* <th className="p-4 border-b">Date of Birth</th> */}
                <th className="p-2 border-b">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td className="p-2 border-b">{student.id}</td>
                  <td className="p-2 border-b">{student.name}</td>
                  <td className="p-2 border-b">{student.gender}</td>
                  <td className="p-2 border-b">{student.class}</td>
                  <td className="p-2 border-b">{student.parent.fatherName}</td>
                  <td className="p-2 border-b">{student.parent.address}</td>
                  {/* <td className="p-4 border-b">{student.dateOfBirth}</td> */}
                  <td className="p-2 border-b">{student.parent.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          )}
          <div className="flex justify-end items-center mt-4">
            <button
              className="py-2 px-4 border rounded-lg"
              onClick={handlePreviousPage}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <div className="mx-4">Page {pageNumber} of {totalPages}</div>
            <button
              className="py-2 px-4 border rounded-lg"
              onClick={handleNextPage}
              disabled={pageNumber >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <div className="mt-28">
        <Footer />
      </div>
    </div>
  );
};

export default ParentsData;
