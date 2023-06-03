// Sure, here's an example implementation of Sidebar.jsx:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 shadow-xl h-full">
      <div className="p-6">
        <h3 className="text-white font-medium text-xl mb-6">ChatGPT Memory Extension</h3>
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="text-gray-200 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/tasks"
              className="text-gray-200 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Tasks
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/mind-maps"
              className="text-gray-200 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Mind Maps
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/settings"
              className="text-gray-200 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
