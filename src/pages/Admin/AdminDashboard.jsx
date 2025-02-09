import Slider from "../../components/Slider";
import CircularProgressBar from "../../components/CircularProgressBar";
import SearchBar from "../../components/SearchBar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { User, Users } from "lucide-react";

function AdminDashboard() {
  const [selectedGenie, setGenie] = useState("active");

    const [windowDimensions, setWindowDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
          setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  
  
  return (
    <div>
      <div className={`grid ${windowDimensions.width > 820 ? "grid-cols-[70%_30%]" : "grid-cols-1"} gap-x-4 mt-5`}>
        <div>
          <div className="shadow-lg rounded-lg pb-5">
            <div className="flex bg-custom-green rounded-t-lg p-3 items-center">
              <div className="font-bold text-xl">Overview of the project</div>
              <div className="ml-auto border-2 border-black rounded-md py-1 px-2 text-sm font-bold">
                View
              </div>
            </div>
            <div className={`grid gap-2 ${windowDimensions.width > 820 ? "grid-cols-2" : "grid-cols-1"} p-5`}>
              <div className="bg-gray-200 rounded-md items-center pb-5">
                <div className="flex justify-center bg-custom-orange rounded-t-md py-2 font-medium mb-5">
                  Classroom Projects
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
              <div className="bg-gray-200 rounded-md items-center justify-center">
                <div className="flex justify-center bg-custom-orange rounded-t-md py-2 font-medium mb-5">
                  Personalised Project
                </div>

                <div className="flex justify-center">
                  <CircularProgressBar percentage={50} />
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
              
              <div className="bg-gray-200 rounded-lg items-center pb-5 border-custom-blue border-2 w-full">
                <div className="flex bg-custom-blue rounded-t-md py-2 font-bold mb-5 w-full px-2">
                  <User size={20} />

                  <div className="flex w-full justify-center">Faculty</div>
                </div>
                <div className="flex bg-custom-orange rounded-md mx-2 px-2 py-1">
                  Total Faculty - 19
                </div>
                <div className="grid gap-2 grid-cols-2 px-2">
                  <div className="bg-custom-lime mt-2 h-40 align-center justify-center flex w-full items-center">
                    <div className="flex-row text-center">
                      <div className="text-2xl font-bold">Active Faculty</div>
                      <div className="text-4xl font-bold">4</div>
                    </div>
                  </div>
                  <div className="bg-red-200  mt-2 h-40 align-center justify-center flex w-full items-center">
                    <div className="flex-row text-center">
                      <div className="text-2xl font-bold">Inactive Faculty</div>
                      <div className="text-4xl font-bold">12</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg items-center pb-5 border-custom-blue border-2">
                <div className="flex bg-custom-blue rounded-t-md py-2 font-bold mb-5 w-full px-2">
                  <Users size={20} />

                  <div className="flex w-full justify-center">Students</div>
                </div>
                <div className="flex bg-custom-orange rounded-md mx-2 px-2 py-1">
                  Total Students - 19
                </div>
                <div className="grid gap-2 grid-cols-2 px-2">
                  <div className="bg-custom-lime mt-2 h-40 align-center justify-center flex w-full items-center">
                    <div className="flex-row text-center">
                      <div className="text-2xl font-bold">Active Faculty</div>
                      <div className="text-4xl font-bold">4</div>
                    </div>
                  </div>
                  <div className="bg-red-200 mt-2 h-40 align-center justify-center flex w-full items-center">
                    <div className="flex-row">
                      <div className="flex-row text-center border-b-2 p-2 border-black">
                        <div className="text-md font-semibold">
                          {"Inactive Student(s)"}
                        </div>
                        <div className="text-l font-semibold text-wrap">12</div>
                      </div>
                      <div className="flex-row text-center p-2">
                        <div className="text-md font-semibold">
                          {"Deleted Student(s)"}
                        </div>
                        <div className="text-l font-semibold">12</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <div className="shadow-lg rounded-lg ">
            <div className="flex bg-custom-lime rounded-t-lg p-3 items-center">
              <div className="font-bold text-xl">Wall of Fame</div>
            </div>
            <Slider />
          </div>
          <div className="shadow-lg rounded-lg bg-custom-orange-light">
            <div className="flex bg-custom-orange rounded-t-lg p-3 items-center">
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

export default AdminDashboard;
