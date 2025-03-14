import React, { useEffect } from 'react'
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import axiosConfig from '../../request/request';
import { getAPI } from '../../request/APIManager';
import { useNavigate } from 'react-router-dom';

const divisions = [
    "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
    "1 Coding", "2 Coding", "3 Coding", "4 Coding", "5 Coding", "6 Coding",
    "7 Coding", "8 Coding", "9 Coding", "10 Coding", "11 Coding", "12 Coding",
    "Gr 01_Chinm", "Gr 02_Chinm", "Gr 03_Chinm", "Gr 04_Chinm", "Gr 05_Chinm",
    "Gr 06_Chinm", "Gr 07_Chinm", "Gr 08_Chinm", "Gr 09_Chinm", "Gr 10_Chinm",
    "Gr 11_Chinm", "Gr 12_Chinm", "Gr 13_Chinm"
  ];

 

function Divisions() {
    const navigation = useNavigate();
    
    
    const fetchAllGrades = async () => {
        const response = await getAPI(navigation, "/accounts/admin/grades/")
        console.log("response == ", response)

        const response2 = await getAPI("/accounts/admin/divisions/")
        console.log("response 2 == ", response2)
    }

    useEffect(() => {
        fetchAllGrades()
    })
    const handleInputChange = (key, value) => {
        console.log("EVENT = ", key, value)
    }

    return (
        <div className="border p-4 rounded-lg shadow-md w-full max-w-2xl bg-white mt-5">
          <div
            className="flex items-center gap-2 cursor-pointer p-2 bg-orange-200 rounded-md"

          >
            <ChevronDown size={18} /> 
            <span className="font-semibold text-gray-700">Grades</span>
          </div>
          
            <div className="p-4 border-l mt-2">
              <div className="grid grid-cols-4 gap-2">
                {divisions.map((grade, index) => (
                  <label key={index} className="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" className="accent-gray-500" onChange={(event) => handleInputChange(grade, event.target.checked)}/>
                    {grade}
                  </label>
                ))}
              </div>
            </div>
          
        </div>
      );
}

export default Divisions