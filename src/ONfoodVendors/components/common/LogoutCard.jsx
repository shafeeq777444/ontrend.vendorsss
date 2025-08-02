import React from 'react';
import { LogOut } from 'lucide-react'; // Optional icon, or use an image

const LogoutConfirmation = () => {
  return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center max-w-xs w-full border border-pink-200 fixed top-30 right-5">
        <div className="flex justify-center mb-3">
          <div className="relative">
            {/* Optional: custom image instead */}
            <div className=" rounded-md p-1.5">
            <img classname="w-10 h-20" src='/lotties/logout.png'></img>
            </div>
          </div>
        </div>

        <h2 className="text-sm font-semibold mb-1">Oh no! You're leaving...</h2>
        <p className="text-xs text-gray-500 mb-4">Are you sure?</p>

        <div className="space-y-2">
          <button className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-1.5 px-3 rounded-md shadow hover:scale-105     transition text-xs">
            Naah, Just Kidding
          </button>

          <button className="w-full border border-blue-500 text-blue-600 py-1.5 px-3 rounded-md hover:bg-blue-50 transition text-xs">
            Yes, Log Me Out
          </button>
        </div>
      </div>
  );
};

export default LogoutConfirmation;
