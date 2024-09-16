import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center space-x-2">
          <img src="/path/to/logo.png" alt="Employia Logo" className="h-10" />
          <span className="text-3xl text-white font-bold">Employia</span>
        </div>
        <h1 className="text-5xl text-white font-bold">
          Make Employia the Great or die trying
        </h1>
        <p className="text-gray-400">Administration user log-in portal</p>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-white text-2xl mb-4 text-center">log in</h2>
          <form className="space-y-6">
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
