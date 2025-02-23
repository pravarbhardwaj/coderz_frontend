import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const GalleryCard = ({ data, setOpen, setUpload }) => {
  const [feedback, openFeedback] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setUpload(data);
  };
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden border hover:border-2 hover:border-red-500 hover:drop-shadow-2xl hover:shadow-slate-950">
      <div className="relative bg-gradient-to-r from-orange-200 to-blue-200 p-6">
        <div className="flex justify-between items-center"></div>

        <div className="text-center mt-4">
          <p className="text-6xl font-bold text-orange-600">1</p>
          <p className="text-6xl font-bold text-blue-600">2</p>
          <p className="text-6xl font-bold text-green-600">3</p>
        </div>
      </div>


      <div className="p-4">
        <div className="flex">
          <h2 className="text-lg font-bold text-gray-800">{data.title}</h2>
        </div>
       

        {feedback && 
        <div>
        <div className="border-2 border-gray-300 rounded-md p-2 mt-2">
          <div className="text-red-500 font-semibold">Teacher's Feedback</div>
          <div className="text-sm">{data.teachers_feedback}</div>
        </div>

        <div className="border-2 border-gray-300 rounded-md p-2 mt-2">
          <div className="text-red-500 font-semibold">My Learning</div>
          <div className="text-sm">{data.my_learning}</div>
        </div>
        </div>}

        
      </div>

      {/* View Button */}
      <div className="bg-gray-100 py-3 text-center px-6">
        <button
          className="bg-custom-blue text-white font-semibold py-2 w-full rounded shadow-2xl"
          onClick={handleOpen}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default GalleryCard;
