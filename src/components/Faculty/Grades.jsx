import React, { useEffect } from "react";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import axiosConfig from "../../request/request";
import { getAPI } from "../../request/APIManager";
import { useNavigate } from "react-router-dom";

const Grades = ({ setGdMapping }) => {
  const navigation = useNavigate();
  const [selectedGrades, setSelectedGrades] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setGdMapping(selected);
  }, [selected]);
  const [grades, setGrades] = useState({});
  const [data, setData] = useState([]);

  const fetchAllGrades = async () => {
    const response = await getAPI(
      navigation,
      "/accounts/admin/grade-division-mapping/"
    );
    const gs = {};
    response.forEach((item) => (gs[item.grade] = item));
    setData([...response]);
    setGrades(gs);
  };

  useEffect(() => {
    fetchAllGrades();
  }, []);

  const handleInputChange = (key, value) => {
    console.log("EVENT = ", key, value);
    const object = data.find((grade) => grade.id === key);

    if (value) {
      console.log("objectss = ", object);
      setSelected((prev) => ({
        ...prev,
        [object["grade"]]: [],
      }));
      setSelectedGrades((prev) => ({
        ...prev,
        [object["grade"]]: object["divisions"]
          ? object["divisions"].split(",")
          : [],
      }));
    } else {
      setSelectedGrades((prev) => {
        const updatedData = { ...prev };
        delete updatedData[object["grade"]];
        return updatedData;
      });
      setSelected((prev) => {
        const updatedData = { ...prev };
        delete updatedData[object["grade"]];
        return updatedData;
      });
    }
  };

  const handleDivisionChange = (grade, division, action) => {
    const arr = selected[grade];
    if (action) {
      arr.push(division);
    } else {
      arr.pop(arr.indexOf(division));
    }
    setSelected((prev) => ({
      ...prev,
      [grade]: arr,
    }));
  };
  return (
    <div className="border p-4 rounded-lg shadow-md w-full max-w-2xl bg-white mt-5">
      <div className="flex items-center gap-2 cursor-pointer p-2 bg-orange-200 rounded-md">
        <ChevronDown size={18} />
        <span className="font-semibold text-gray-700">Grades</span>
      </div>

      <div className="p-4 border-l mt-2">
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(grades).map((grade, index) => (
            <label
              key={grades[grade]["id"]}
              className="flex items-center gap-2 text-gray-600"
            >
              <input
                type="checkbox"
                className="accent-gray-500"
                onChange={(event) =>
                  handleInputChange(grades[grade]["id"], event.target.checked)
                }
              />
              {grades[grade]["grade"]}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 cursor-pointer p-2 bg-orange-200 rounded-md">
        <ChevronDown size={18} />
        <span className="font-semibold text-gray-700">Divisions</span>
      </div>

      {Object.keys(selectedGrades).map((grade, index) => (
        <div className="mt-2 border-2 p-2">
          {grade}

          <div className="grid grid-cols-4 gap-2">
            {selectedGrades[grade].map((division, index) => (
              <label
                key={`${grade}-${division}`}
                className="flex items-center gap-2 text-gray-600"
              >
                <input
                  type="checkbox"
                  className="accent-gray-500"
                  onChange={(event) =>
                    handleDivisionChange(grade, division, event.target.checked)
                  }
                />
                {division}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Grades);
