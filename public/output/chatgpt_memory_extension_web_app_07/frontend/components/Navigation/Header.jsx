

const Header = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg className="fill-current h-8 w-8 mr-2" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M27 0C12.1 0 0 12.1 0 27s12.1 27 27 27 27-12.1 27-27S41.9 0 27 0zm12.8 20.3l-6.6 7.5c-.3.3-.7.5-1.1.5s-.8-.2-1.1-.5l-6.6-7.5c-.5-.6-.3-1.5.4-2 1.1-.9 2.5-.4 3.1.8l3.6 5.3 3.6-5.3c.6-1.2 2-1.7 3.1-.8.7.5.9 1.4.4 2z"/></svg>
        <span className="font-semibold text-xl tracking-tight">ChatGPT Memory Extension Web App</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3a3 3 0 0 1 3-3h14a3 3 0 0 1 0 6H3a3 3 0 0 1-3-3zm0 7a3 3 0 0 1 3-3h14a3 3 0 0 1 0 6H3a3 3 0 0 1-3-3zm0 7a3 3 0 0 1 3-3h14a3 3 0 0 1 0 6H3a3 3 0 0 1-3-3z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
            Docs
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
            Examples
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white">
            Blog
          </a>
        </div>
        <div>
          <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-700 hover:border-blue-800 hover:bg-blue-800 mt-4 lg:mt-0">Download</a>
        </div>
      </div>
    <