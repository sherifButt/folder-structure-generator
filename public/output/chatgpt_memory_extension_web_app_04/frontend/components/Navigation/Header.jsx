

const Header = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="/" className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="/logo.svg" alt="Logo"/>
              <img className="hidden lg:block h-8 w-auto" src="/logo.svg" alt="Logo"/>
              <span className="text-lg font-bold ml-2">ChatGPT Memory Extension</span>
            </a>
            <div className="hidden sm:ml-6 sm:flex">
              <a href="/features" className="nav-link">Features</a>
              <a href="/pricing" className="nav-link">Pricing</a>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Header;
