// Here's an implementation of the Sidebar.jsx file:


import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-800 text-gray-100">
      <div className="flex items-center justify-center mb-8">
        <span className="text-lg font-semibold uppercase">ChatGPT Memory Extension</span>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link href="/">
          <a className="text-gray-400 hover:text-gray-100">Home</a>
        </Link>
        <Link href="/tasks">
          <a className="text-gray-400 hover:text-gray-100">Tasks</a>
        </Link>
        <Link href="/mindmaps">
          <a className="text-gray-400 hover:text-gray-100">Mind Maps</a>
        </Link>
        <Link href="/settings">
          <a className="text-gray-400 hover:text-gray-100">Settings</a>
        </Link>
      <