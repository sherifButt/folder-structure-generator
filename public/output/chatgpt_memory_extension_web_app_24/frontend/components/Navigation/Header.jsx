



const Header = () => {
  return (
    <header className="bg-gray-800 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <img className="h-8" src="/logo.svg" alt="ChatGPT Memory Extension" />
        </div>
        <div className="sm:hidden">
          <button type="button" className="text-gray-500 hover:text-white focus:text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path className="hidden" fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              <path className="block" fillRule="evenodd" clipRule="evenodd" d="M6 4h12v2H6V4zm-2 5h16v2H4v-2zm2 5h12v2H6v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <nav className="hidden sm:flex sm:items-center sm:px-4 sm:py-3">
        <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Team</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
      <