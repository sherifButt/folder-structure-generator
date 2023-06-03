


import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 px-4 py-8">
      <div className="flex items-center justify-center">
        <Link href="/">
          <a className="text-white text-2xl font-bold uppercase hover:text-gray-300">ChatGPT Memory Extension</a>
        </Link>
      </div>
      <nav className="mt-10">
        <Link href="/">
          <a className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 hover:text-white">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Home
          </a>
        </Link>
        <Link href="/tasks">
          <a className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 hover:text-white">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Tasks
          </a>
        </Link>
        <Link href="/mindmap">
          <a className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 hover:text-white">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            Mind Map
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

