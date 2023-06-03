


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
                fillRule="evenodd"
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              />
            </svg>
          </button>
        </div>
      </div>
      <nav className="hidden sm:flex sm:items-center sm:px-4 sm:py-3">
        <Link href="/">
          <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
        </Link>
        <Link href="/about">
          <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
        </Link>
        <Link href="/contact">
          <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
        </Link>
      <