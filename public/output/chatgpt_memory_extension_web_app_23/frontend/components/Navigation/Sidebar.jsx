


import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 px-4 py-8">
      <div className="flex items-center justify-center">
        <span className="text-white font-bold text-2xl">ChatGPT Memory Extension</span>
      </div>
      <nav className="mt-10">
        <Link href="/">
          <a className="flex items-center mt-4 py-2 px-6 bg-gray-700 bg-opacity-25 text-gray-100">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Dashboard
          </a>
        </Link>
        <Link href="/tasks">
          <a className="flex items-center mt-4 py-2 px-6 hover:bg-gray-700 hover:bg-opacity-25 text-gray-100">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Tasks
          </a>
        </Link>
        <Link href="/mindmap">
          <a className="flex items-center mt-4 py-2 px-6 hover:bg-gray-700 hover:bg-opacity-25 text-gray-100">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Mind Map
          </a>
        </Link>
      <Link href="