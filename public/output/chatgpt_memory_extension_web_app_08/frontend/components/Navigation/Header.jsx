

function Header() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19c0 1.104-.896 2-2 2s-2-.896-2-2h4zm5-14v6a6 6 0 01-6 6H6a6 6 0 01-6-6V5h14zM10 3h4a2 2 0 012 2v1h-8V5a2 2 0 012-2z" />
                </svg>
              </button>

              <div className="ml-3 relative">
                <div>
                  <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                    <img className="h-8 w-8 rounded-full" src="https://avatars.githubusercontent.com/u/13969516?v=4" alt="Profile"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
              <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <a href="/" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="/about" className="mt-1 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
        </div>
      </div>
    <