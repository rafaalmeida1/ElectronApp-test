import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, TruckIcon } from '@heroicons/react/outline';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Oficina App</h1>
      </div>
      <nav className="mt-4">
        <Link to="/" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
          <HomeIcon className="w-5 h-5 mr-2" />
          Dashboard
        </Link>
        <Link to="/clientes" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
          <UserGroupIcon className="w-5 h-5 mr-2" />
          Clientes
        </Link>
        <Link to="/veiculos" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
          <TruckIcon className="w-5 h-5 mr-2" />
          Veículos
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;