import React from "react";

const Test = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full h-10 flex items-center justify-center bg-white shadow-md z-10">
        Navbar
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-[300px] h-[300px] bg-green-900 border border-red-500"
            ></div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-10 flex items-center justify-center bg-white shadow-md z-10">
        Footer
      </div>
    </div>
  );
};

export default Test;
