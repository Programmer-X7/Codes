import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-slate-900 flex items-center justify-between p-6">
      <Link to="/home" className="font-bold text-3xl text-white">
        Suman
      </Link>
      <Link to="/profile" className="rounded-full">
        <img
          className="object-cover w-10 h-10 rounded-full ring ring-gray-300 dark:ring-gray-600"
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
          alt="profile"
        />
      </Link>
    </div>
  );
};

export default Navbar;
