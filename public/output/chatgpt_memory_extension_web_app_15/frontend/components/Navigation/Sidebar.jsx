

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 px-4 pt-4">
      <div className="flex items-center justify-center mt-8">
        <div className="flex items-center">
          <svg
            className="h-6 w-6 fill-current text-green-500 mr-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM17.5 15.5L11 11.5V7H13V10.3L18.3 13.8C18.69 14.03 19 14.44 19 14.9C19 15.5 18.5 16 17.9 16C17.44 16 17.03 15.69 16.8 15.3L16.5 14.9L14.5 16.5L14.8 16.9C15.03 17.28 15.44 17.69 15.9 17.9C16.28 18.06 16.72 18.06 17.1 17.9L17.5 17.6L19.5 19.1L19.2 18.7C19.03 18.31 18.62 18 18.1 18C17.66 18 17.25 18.22 17 18.5L16.5 19L14.5 17.5L14.8 17.1C15.06 16.72 15.06 16.28 14.8 15.9C14.44 15.31 13.69 15 12.9 15H11V10.5L4.5 6.5L4.5 17.5L11 13.5V19H12.5V13.5L17.5 16.5V15.5Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-white text-2xl mx-2 font-semibold">
            ChatGPT
          </span>
        </div>
      </div>
      <nav className="mt-10">
        <a
          className="flex items-center py-2 px-4 bg-gray-700 bg-opacity-25 text-gray-100"
          href="#"
        >
          <svg
            className="h-6 w-6 fill-current text-gray-400 mr-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z"
              fill="currentColor"
            />
          </svg>
          <span className="mx-3">Dashboard</span>
        </a>
        <a
          className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
          href="#"
        >
          <svg
            className="h-6 w-6 fill-current text-gray-400 mr-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z"
              fill="currentColor"
            />
          </svg>
          <span className="mx-3">Tasks</span>
        </a>
        <a
          className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
          href="#"
        >
          <svg
            className="h-6 w-6 fill-current text-gray-400 mr-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z"
              fill="currentColor"
            />
          </svg>
          <span className="mx-3">Calendar</span>
        </a>
        <a
          className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25"
          href="#"
        >
          <svg
            className="h-6 w-6 fill-current text-gray-400 mr-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z"
              fill="currentColor"
            />
          </svg>
          <span className="mx-3">Reports</span>
        </a>
      <nav>
    </div>
  );
};

export default Sidebar;