import React from 'react';
import Header from "../Header/Header"
import Footer from '../Footer/Footer';

const DashboardComponent = () => (
  <section>
    <Header/>
  <div className="bg-gray-100 p-4 mt-10 min-h-screen">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">1154 x 99</button>
        <div className="flex items-center space-x-2">
          <span className="inline-block h-6 w-6 rounded-full bg-blue-700"></span>
          <span className="inline-block h-6 w-6 rounded-full bg-blue-700"></span>
          <span className="inline-block h-6 w-6 rounded-full bg-blue-700"></span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">Earnings</h2>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-2xl font-semibold">$90,000</p>
          <p className="text-2xl font-semibold text-red-500">$76,000</p>
        </div>
        {/* Placeholder for a chart */}
        <div className="h-40 bg-gray-200 mt-4"></div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">Expenses</h2>
        {/* Placeholder for a chart */}
        <div className="h-40 bg-gray-200 mt-4"></div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">Event Calendar</h2>
        {/* Placeholder for a calendar */}
        <div className="h-40 bg-gray-200 mt-4"></div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold">Reminders</h2>
        <ul className="mt-2">
          <li className="mb-2 p-2 bg-yellow-200 rounded">Reminder 1</li>
          <li className="mb-2 p-2 bg-yellow-200 rounded">Reminder 2</li>
          <li className="mb-2 p-2 bg-yellow-200 rounded">Reminder 3</li>
        </ul>
      </div>
    </div>
  </div>
  <Footer/>
  </section>
);

export default DashboardComponent;