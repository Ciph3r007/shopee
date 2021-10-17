import React from "react";
import { Link } from "react-router-dom";
import catNotFound from "../../assets/img/catNotFound.svg";

const NotFound = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white min-h-screen flex items-center">
      <div className="container mx-auto p-4 flex flex-wrap items-center">
        <div className="w-full md:w-5/12 text-center p-4">
          <img src={catNotFound} alt="Not Found" />
        </div>
        <div className="w-full md:w-7/12 text-center md:text-left p-4">
          <div className="text-6xl font-medium">404</div>
          <div className="text-xl md:text-3xl font-medium mb-4">
            Oops! This page has gone missing.
          </div>
          <div className="text-lg mb-8">
            You may have mistyped the address or the page may have been moved.
          </div>
          <Link to="/">
            <span className="transition duration-500 ease-out p-4 rounded border border-opacity-50 hover:border-opacity-100  ">
              Go Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
