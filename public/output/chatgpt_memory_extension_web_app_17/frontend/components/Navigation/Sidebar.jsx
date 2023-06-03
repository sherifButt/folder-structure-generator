



const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800">
      <div className="flex items-center justify-center h-14 text-white text-xl font-bold">ChatGPT Memory Extension</div>
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          <li className="px-5 py-2 text-white hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="px-5 py-2 text-white hover:bg-gray-700 cursor-pointer">Tasks</li>
          <li className="px-5 py-2 text-white hover:bg-gray-700 cursor-pointer">Mind Maps</li>
          <li className="px-5 py-2 text-white hover:bg-gray-700 cursor-pointer">Settings</li>
        </ul>
      <div>
  );
};

export default Sidebar;