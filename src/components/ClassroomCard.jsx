import React from "react";

const ClassroomCard = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden border">
      {/* Top Section */}
      <div className="relative bg-gradient-to-r from-orange-200 to-blue-200 p-6">
        <div className="flex justify-between items-center"></div>

        <div className="text-center mt-4">
          <p className="text-6xl font-bold text-orange-600">1</p>
          <p className="text-6xl font-bold text-blue-600">2</p>
          <p className="text-6xl font-bold text-green-600">3</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        <div className="flex">
          <h2 className="text-lg font-bold text-gray-800">Odd-Even Number</h2>
          <div className="ml-auto rounded-md bg-red-400 font-semibold text-white px-2">
            Pending
          </div>
        </div>
        <p className="text-gray-500 text-sm">Module : NA</p>
        <p className="text-gray-500 text-sm">Tool : Python - VS Code</p>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="text-sm text-gray-600 mr-2">Session Shared</div>
          <div className="ml-auto flex items-center">
            <div className="bg-custom-dark-green w-3 h-3 rounded-full mr-4"></div>
            1/1
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-gray-600">Reflectives :</div>
          <div className="text-gray-600 ml-auto flex">
            
            <div className="mr-2"><progress className="rounded-md border-2 h-1" value={0}/></div>0/0</div>
        </div>
      </div>

      {/* View Button */}
      <div className="bg-gray-100 py-3 text-center px-6">
        <button className="bg-custom-blue text-white font-semibold py-2 w-full rounded shadow-2xl">
          View
        </button>
      </div>
    </div>
  );
};

export default ClassroomCard;
