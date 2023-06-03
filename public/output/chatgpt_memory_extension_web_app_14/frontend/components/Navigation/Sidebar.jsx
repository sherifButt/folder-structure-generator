


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
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4l-8 8h5v8h6v-8h5l-8-8zm-2.83 9h5.66L12 16.17l-2.83-3.17z" />
            </svg>
            Home
          </a>
        </Link>
        <Link href="/tasks">
          <a className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 hover:text-white">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 3h-2V1h-2v2H9V1H7v2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM5 5h14v10H5V5zm14 14H5V11h14v8z" />
            </svg>
            Tasks
          </a>
        </Link>
        <Link href="/mindmap">
          <a className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 hover:text-white">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2.5L2.5 12H6v7h12v-7h3.5L12 2.5zM7 14h10v2H7v-2z" />
            </svg>
            Mind Map
          </a>
        </Link>
      <div>
  );
};

export default Sidebar;