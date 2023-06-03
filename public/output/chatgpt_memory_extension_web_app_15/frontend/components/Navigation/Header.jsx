


import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <Link href="/">
            <a className="text-white text-2xl font-bold">ChatGPT Memory Extension</a>
          </Link>
        </div>
        <div className="sm:hidden">
          <button type="button" className="text-gray-500 hover:text-white focus:text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                className="hidden"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
              <path
                className="block"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 4h12v2H6V4zm-2 5h16v2H4v-2zm2 5h12v2H6v-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <nav className="px-2 pt-2 pb-4 sm:flex sm:p-0">
        <Link href="/">
          <a className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-700">Home</a>
        </Link>
        <Link href="/about">
          <a className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-700">About</a>
        </Link>
        <Link href="/contact">
          <a className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-700">Contact</a>
        </Link>
      <div className="mt-3 sm:mt-0 sm:ml-2">
          <a href="#" className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-700 sm:inline-block sm:mt-0">Sign in</a>
          <a href="#" className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-700 sm:inline-block sm:mt-0 ml-2">Sign up</a>
        </div>
      <div>
      <