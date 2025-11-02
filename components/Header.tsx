
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
        <div className="inline-flex items-center bg-white rounded-full p-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V5a1 1 0 00-1.447-.894l-4 2A1 1 0 0011 7v10zM4 17a1 1 0 001.447.894l4-2A1 1 0 0010 15V5a1 1 0 00-1.447-.894l-4 2A1 1 0 004 7v10z" />
            </svg>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 ml-4">
                <span className="text-yellow-500">Geo</span>
                <span className="text-green-500">me</span>
                <span className="text-red-500">try</span>
                <span className="text-blue-500"> Fu</span>
                <span className="text-purple-500">n!</span>
            </h1>
        </div>
        <p className="text-slate-600 mt-2 text-lg">Let's learn about shapes together!</p>
    </header>
  );
};
