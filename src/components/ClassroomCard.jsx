import React from "react";

const ClassroomCard = ({data, setProject, setProjectId}) => {
  const circles = []

  for(let i = 1; i <= data.total_reflectives; i++) {
    if (i <= data.reflectives) {
      circles.push("green")
    }
    else {
      circles.push("gray")
    }
  }

  const handleOpen = () => {
    setProject(true);
    setProjectId(data.id);
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

      {/* Bottom Section */}
      <div className="p-4">
        <div className="flex">
          <h2 className="text-lg font-bold text-gray-800">{data.title}</h2>
          <div className="ml-auto rounded-md bg-red-400 font-semibold text-white px-2">
            Pending
          </div>
        </div>
        <p className="text-gray-500 text-sm">Module : {data.module}</p>
        <p className="text-gray-500 text-sm">Tool : {data.tool}</p>

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="text-sm text-gray-600 mr-2">Session Shared</div>
          <div className="ml-auto flex items-center">
            {circles.map((item) => (
            <div className={`${item == "green" ? "bg-green-400" : "bg-gray-400"} w-3 h-3 rounded-full mr-2`}></div>

            ))}
            {data.session_shared}/{data.total_session}
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-gray-600">Reflectives :</div>
          <div className="text-gray-600 ml-auto flex">
            
            <div className="mr-2"><progress className="rounded-md h-1" value={data.total_reflectives == 0 ? 0 :data.reflectives/data.total_reflectives}/></div>{data.reflectives}/{data.total_reflectives}</div>
        </div>
      </div>

      {/* View Button */}
      <div className="bg-gray-100 py-3 text-center px-6">
        <button className="bg-custom-blue text-white font-semibold py-2 w-full rounded shadow-2xl" 
        onClick={handleOpen}>
          View
        </button>
      </div>
    </div>
  );
};

export default ClassroomCard;
