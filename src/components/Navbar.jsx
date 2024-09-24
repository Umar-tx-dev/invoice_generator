import React from "react";

const Navbar = ({ reset, onSubmit }) => {
  return (
    <header className="max-w-[1440px] w-full flex justify-between items-center mb-4 mx-auto h-[66px]">
      <div className="w-[1376px] flex justify-between mx-auto">
        <div>
          <h1 className="text-2xl font-bold">New Invoice</h1>
          <p>Create new invoice for your customers</p>
        </div>
        <div>
          <button
            className="bg-gray-200 p-2 rounded mr-2 w-[80px] h-[44px]"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="bg-purple-600 text-white p-2 rounded w-[80px] h-[44px]"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
