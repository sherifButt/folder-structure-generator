import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-200">
      <div className="flex items-center justify-center mt-10">
        <img
          src="/logo.png"
          alt="logo"
          className="h-12 w-12 object-contain"
        />
        <span className="text-2xl font-semibold mx-2">ChatGPT</span>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="px-6 py-4 hover:bg-gray-300 cursor-pointer">
            <a href="#">Dashboard</a>
          </li>
          <li className="px-6 py-4 hover:bg-gray-300 cursor-pointer">
            <a href="#">Mind Map</a>
          </li>
          <li className="px-6 py-4 hover:bg-gray-300 cursor-pointer">
            <a href="#">Task List</a>
          </li>
          <li className="px-6 py-4 hover:bg-gray-300 cursor-pointer">
            <a href="#">Settings</a>
          </li>
        </ul>
      <