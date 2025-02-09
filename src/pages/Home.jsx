import Slider from "../components/Slider";
import CircularProgressBar from "../components/CircularProgressBar";
import SearchBar from "../components/SearchBar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const [selectedGenie, setGenie] = useState("active");
 

  return (
    <div>
      
      <div className="grid grid-cols-[70%_30%] gap-x-4 mt-5">
        <div>
          <div className="shadow-lg rounded-lg pb-5">
            <div className="flex bg-custom-green rounded-t-lg p-3 items-center">
              <div className="font-bold text-xl">Overview of the project</div>
              <div className="ml-auto border-2 border-black rounded-md py-1 px-2 text-sm font-bold">
                Some Text
              </div>
            </div>
            <div className="grid gap-2 grid-cols-2 p-5">
              <div className="bg-gray-200 rounded-md items-center pb-5">
                <div className='flex justify-center bg-custom-orange-light rounded-t-md py-2 font-medium mb-5'>Classroom Project</div>
                <div className="flex justify-center">
                  <CircularProgressBar percentage={70} />
                </div>
                <div className="pt-2 px-5">
                  {/* <div className="font-bold">Classroom Project</div> */}
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
              <div className='flex justify-center bg-custom-orange-light rounded-t-md py-2 font-medium mb-5'>Personalised Project</div>

                <div className="flex justify-center">
                  <CircularProgressBar percentage={50} />
                </div>
                <div className="pt-2 px-5">
                  {/* <div className="font-bold">Classroom Project</div> */}
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
            <div className="px-5">
              <div className="mt-3 font-bold text-lg">Pending Project List</div>
              <div className="grid gap-2 grid-cols-3">
                <div className="border-2 border-custom-dark-green rounded-md p-2">
                  <div className="font-normal text-sm">
                    BMI Calculator | classroom
                  </div>
                  <div className="font-normal text-sm text-red-600">
                    Due Date: 8th Jun 24
                  </div>
                </div>
                <div className="border-2 border-custom-dark-green rounded-md p-2">
                  <div className="font-normal text-sm">
                    BMI Calculator | classroom
                  </div>
                  <div className="font-normal text-sm text-red-600">
                    Due Date: 8th Jun 24
                  </div>
                </div>
                <div className="border-2 border-custom-dark-green rounded-md p-2">
                  <div className="font-normal text-sm">
                    BMI Calculator | classroom
                  </div>
                  <div className="font-normal text-sm text-red-600">
                    Due Date: 8th Jun 24
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
              <div className={`rounded-t-md justify-center flex bg-${selectedGenie == 'active' ? 'custom-orange-dark' : 'custom-blue'} px-2 py-1 font-extralight hover:cursor-pointer`}
              onClick={() => setGenie("active")}
              >
                Active
              </div>
              <div className={`rounded-t-md justify-center flex bg-${selectedGenie == 'due' ? 'custom-orange-dark' : 'custom-blue'} px-2 py-1 font-extralight hover:cursor-pointer`}
              onClick={() => setGenie("due")}
              >

                DUE THIS WEEK
              </div>
            </div>
            <div className="flex justify-center mt-5">There Is No New Notice On The Board</div>
          </div>
        </div>
      </div>
      <div className="pt-5 font-bold text-xl">Active Project</div>
      <div>There are no active projects to complete.</div>
    </div>
  );
}

export default Home;
