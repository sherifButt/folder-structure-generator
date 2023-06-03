import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700" href="#">
                ChatGPT Memory Extension Web App
              </a>
            </div>

            <div className="flex md:hidden">
              <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="menu md:flex hidden">
            <ul className="flex flex-col md:flex-row list-none md:ml-auto">
              <li className="md:ml-4">
                <a className="text-gray-800 font-medium hover:text-gray-600" href="#">
                  Home
                </a>
              </li>
              <li className="md:ml-4">
                <a className="text-gray-800 font-medium hover:text-gray-600" href="#">
                  Dashboard
                </a>
              </li>
              <li className="md:ml-4">
                <a className="text-gray-800 font-medium hover:text-gray-600" href="#">
                  Profile
                </a>
              </li>
              <li className="md:ml-4">
                <a className="text-gray-800 font-medium hover:text-gray-600" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      <