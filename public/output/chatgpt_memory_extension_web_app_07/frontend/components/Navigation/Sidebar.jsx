Here is an implementation of Sidebar.jsx:

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-white shadow-xl">
      <div className="h-20 flex items-center justify-center">
        <Link to="/" className="font-bold text-2xl text-gray-800">ChatGPT Memory Extension</Link>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <Link to="/dashboard" className="font-semibold text-lg text-gray-800 mb-4">Dashboard</Link>
        <Link to="/mind-map" className="font-semibold text-lg text-gray-800 mb-4">Mind Map</Link>
        <Link to="/task-list" className="font-semibold text-lg text-gray-800 mb-4">Task List</Link>
      </div>
      <div className="h-20 flex items-center justify-center">
        <Link to="/logout" className="font-semibold text-lg text-gray-800">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
