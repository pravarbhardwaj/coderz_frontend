import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getAPI } from "../../request/APIManager";
import { useNavigate } from "react-router-dom";

const Grades = ({ setGdMapping, userPayload }) => {
  const navigation = useNavigate();
  const [grades, setGrades] = useState({});
  const [data, setData] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetchAllGrades();
  }, []);

  useEffect(() => {
    if (userPayload && userPayload.grade_division_mapping) {
      prepopulateGrades(userPayload.grade_division_mapping);
    }
  }, [data]);

  // Update parent component whenever selected changes
  useEffect(() => {
    setGdMapping(selected);
  }, [selected, setGdMapping]);

  const fetchAllGrades = async () => {
    const response = await getAPI(
      navigation,
      "/accounts/admin/grade-division-mapping/"
    );
    const gs = {};
    response.forEach((item) => (gs[item.grade] = item));
    setData(response);
    setGrades(gs);
    setSelected({...userPayload.grade_division_mapping})
  };

  const prepopulateGrades = (mapping) => {
    const updatedSelected = {};
    const updatedSelectedGrades = {};

    Object.keys(mapping).forEach((grade) => {
      if (grades[grade]) {
        updatedSelected[grade] = mapping[grade];
        updatedSelectedGrades[grade] = grades[grade].divisions
          ? grades[grade].divisions.split(",")
          : [];
      }
    });

    setSelected(updatedSelected);
    setSelectedGrades(updatedSelectedGrades);
  };

  const handleInputChange = (key, value) => {
    const object = data.find((grade) => grade.id === key);
    if (!object) return;

    if (value) {
      setSelected((prev) => ({
        ...prev,
        [object.grade]: [],
      }));
      setSelectedGrades((prev) => ({
        ...prev,
        [object.grade]: object.divisions ? object.divisions.split(",") : [],
      }));
    } else {
      setSelectedGrades((prev) => {
        const updatedData = { ...prev };
        delete updatedData[object.grade];
        return updatedData;
      });
      setSelected((prev) => {
        const updatedData = { ...prev };
        delete updatedData[object.grade];
        return updatedData;
      });
    }
  };

  const handleDivisionChange = (grade, division, action) => {
    setSelected((prev) => ({
      ...prev,
      [grade]: action
        ? [...prev[grade], division]
        : prev[grade].filter((div) => div !== division),
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
          {Object.keys(grades).map((grade) => (
            <label
              key={grades[grade].id}
              className="flex items-center gap-2 text-gray-600"
            >
              <input
                type="checkbox"
                className="accent-gray-500"
                checked={!!selected[grade]}
                onChange={(event) =>
                  handleInputChange(grades[grade].id, event.target.checked)
                }
              />
              {grades[grade].grade}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 cursor-pointer p-2 bg-orange-200 rounded-md">
        <ChevronDown size={18} />
        <span className="font-semibold text-gray-700">Divisions</span>
      </div>

      {Object.keys(selectedGrades).map((grade) => (
        <div key={grade} className="mt-2 border-2 p-2">
          {grade}

          <div className="grid grid-cols-4 gap-2">
            {selectedGrades[grade].map((division) => (
              <label
                key={`${grade}-${division}`}
                className="flex items-center gap-2 text-gray-600"
              >
                <input
                  type="checkbox"
                  className="accent-gray-500"
                  checked={selected[grade]?.includes(division)}
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
