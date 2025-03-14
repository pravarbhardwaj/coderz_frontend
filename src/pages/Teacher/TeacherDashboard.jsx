import CircularProgressBar from "../../components/CircularProgressBar";
import Slider from "../../components/Slider";
import React, { useState } from "react";

function TeacherDashboard() {
  const [selectedGenie, setGenie] = useState("active");
  return (
    <div>
      <div className="flex flex-row gap-5">
      <div className="flex-1">
          <div className="shadow-lg rounded-lg h-3/5">
            <div className="flex bg-custom-blue rounded-t-lg p-3 items-center">
              <div className="font-bold text-xl">Active Project</div>
            </div>
            <div>something</div>
          </div>
          <div className="shadow-lg rounded-lg bg-custom-orange-light h-2/5">
            <div className="flex bg-custom-orange rounded-t-lg p-3 items-center mt-5">
              <div className="font-bold text-xl">TASK GENIE</div>
            </div>
            <div className="flex px-2 mt-2">
              <div
                className={`rounded-t-md justify-center flex border-b-2 border-custom-blue ${
                  selectedGenie == "active"
                    ? "bg-custom-orange-dark "
                    : "bg-custom-blue"
                } px-2 py-1 font-extralight hover:cursor-pointer`}
                onClick={() => setGenie("active")}
              >
                Active
              </div>
              <div
                className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
                  selectedGenie == "due" ? "custom-orange-dark" : "custom-blue"
                } px-2 py-1 font-extralight hover:cursor-pointer`}
                onClick={() => setGenie("due")}
              >
                DUE THIS WEEK
              </div>
              <div
                className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
                  selectedGenie == "inactive"
                    ? "custom-orange-dark"
                    : "custom-blue"
                } px-2 py-1 font-extralight hover:cursor-pointer`}
                onClick={() => setGenie("inactive")}
              >
                Inactive
              </div>
            </div>
            <div className="bg-white mx-2 rounded-tr-md rounded-b-md flex h-4/6 items-center justify-center">
              There Is No New Notice On The Board.
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-200 rounded-md items-center pb-5">
            <div className="flex justify-center bg-custom-orange rounded-t-md py-2 font-medium mb-5">
              Project
            </div>
            <div className="flex justify-center">
              <CircularProgressBar percentage={70} />
            </div>
            <div className="pt-2 px-5">
              <div className="grid grid-cols-[90%_10%] mt-2">
                <div className="bg-custom-dark-green rounded-l-md font-semibold pl-2">
                  Uploaded
                </div>
                <div className="bg-custom-green rounded-r-md font-semibold flex justify-center">
                  2
                </div>
              </div>
              <div className="grid grid-cols-[90%_10%] mt-2">
                <div className="bg-custom-dark-green rounded-l-md font-semibold pl-2">
                  Pending Upload
                </div>
                <div className="bg-custom-green rounded-r-md font-semibold flex justify-center">
                  6
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="shadow-lg rounded-lg">
            <div className="flex bg-custom-lime rounded-t-lg p-3 items-center">
              <div className="font-bold text-xl">Wall of Fame</div>
            </div>
            <Slider />
          </div>
          <div className="shadow-lg rounded-lg bg-custom-orange-light">
            <div className="flex bg-custom-orange rounded-t-lg p-3 items-center mt-5">
              <div className="font-bold text-xl">TASK GENIE</div>
            </div>
            <div className="flex px-2 mt-2">
              <div
                className={`rounded-t-md justify-center flex border-b-2 border-custom-blue ${
                  selectedGenie == "active"
                    ? "bg-custom-orange-dark "
                    : "bg-custom-blue"
                } px-2 py-1 font-extralight hover:cursor-pointer`}
                onClick={() => setGenie("active")}
              >
                Active
              </div>
              <div
                className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
                  selectedGenie == "due" ? "custom-orange-dark" : "custom-blue"
                } px-2 py-1 font-extralight hover:cursor-pointer`}
                onClick={() => setGenie("due")}
              >
                DUE THIS WEEK
              </div>
              <div
                className={`rounded-t-md justify-center flex border-b-2 border-custom-blue bg-${
                  selectedGenie == "inactive"
                    ? "custom-orange-dark"
                    : "custom-blue"
                } px-2 py-1 font-extralight hover:cursor-pointer`}
                onClick={() => setGenie("inactive")}
              >
                Inactive
              </div>
            </div>
            <div className="bg-white mx-2 rounded-tr-md rounded-b-md flex h-4/6 items-center justify-center">
              There Is No New Notice On The Board.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
