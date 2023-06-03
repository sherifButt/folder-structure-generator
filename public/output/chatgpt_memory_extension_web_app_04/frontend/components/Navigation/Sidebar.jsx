// Sure, here's an implementation of Sidebar.jsx:


import { useRouter } from 'next/router';
import { HiOutlineHome, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <aside className="bg-gray-800 h-screen w-64">
      <div className="flex items-center justify-center mt-8">
        <img className="w-24" src="/logo.svg" alt="Logo" />
      </div>

      <nav className="mt-10">
        <ul className="text-gray-400 text-lg font-medium">
          <li
            className={`rounded-md py-2 px-4 ${
              router.pathname === '/' ? 'bg-gray-700' : ''
            }`}
          >
            <a href="/">
              <HiOutlineHome className="inline-block mr-2" />
              Home
            </a>
          </li>
          <li
            className={`rounded-md py-2 px-4 ${
              router.pathname === '/settings' ? 'bg-gray-700' : ''
            }`}
          >
            <a href="/settings">
              <HiOutlineCog className="inline-block mr-2" />
              Settings
            </a>
          </li>
        </ul>

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 rounded-md text-white text-lg font-medium"
          >
            <HiOutlineLogout className="inline-block mr-2" />
            Logout
          </button>
        </div>
      <