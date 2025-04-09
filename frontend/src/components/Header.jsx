import React from "react";

const Header = ({ onLogout }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold">Task Manager</h1>
    <button
      onClick={onLogout}
      className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
);

export default Header;
