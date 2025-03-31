import Quiz from "../../../components/Quiz";
import PPTViewer from "../../../components/PPTViewer";
import SelectionTab from "../../../components/SelectionTab";
import { MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAPI } from "../../../request/APIManager";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import Asset from "../../../components/Asset";
import QuizResults from "../../../components/QuizResults";
import CreateSession from "../SchoolDetails/CreateSession";

const PPT = ({ data }) => {
  return (
    <div>
      <PPTViewer data={data} />
    </div>
  );
};

const Overview = ({ data }) => {
  return (
    <div>
      <p className="font-bold text-xl mt-5">{data.title}</p>
      <p className="text-gray-500 mt-5">- {data.overview_text}</p>
      <div className="mt-5 font-semibold text-lg">Final Outcome - </div>
      <img src={data.thumbnail} className="w-full h-full" />
    </div>
  );
};

function SessionPage({ setSession, data, navigation, projectId }) {
  const [selectedTab, setSelectedTab] = useState("Overview");
  const tabs = ["Overview", "Session PPT"];
  if (data.quizzes.length > 0) {
    tabs.push("Reflectives");
  }

  if (data.assets.length > 0) {
    tabs.push("Assets");
  }
  const [dropdown, setDropdown] = useState("");
  const [sessionData, setSessionData] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});
  const [openSession, setOpenSession] = useState(false);

  const getSessionData = async () => {
    const response = await getAPI(
      navigation,
      `projects/project-sessions/?project_id=${projectId}`
    );
    if (response && response.length > 0) {
      setSessionData([...response]);
      setDropdown(response[0].id);
      setSelectedSession(response[0]);
    }
  };

  useEffect(() => {
    getSessionData();
  }, []);

  const handleChange = (value) => {
    setDropdown(value.target.value);
    const item = sessionData.find((item) => item.id === value.target.value);
    setSelectedSession({ ...item });
  };

  if (sessionData.length == 0) {
    return (
      <div>
        <div className="flex gap-5 items-center">
          <div onClick={() => setSession(false)} className="cursor-pointer">
            <MoveLeft />
          </div>
          <div className="font-bold text-2xl">{data.title}</div>
        </div>
        <p>No Session Data Found!</p>
      </div>
    );
  }
  return (
    <div>
      <Modal
        open={openSession}
        onClose={() => setOpenSession(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-auto"
      >
        <Box className="w-full justify-center items-center flex max-h-fit my-10">
          <CreateSession
            projectId={data?.id}
            setOpenSession={setOpenSession}
            navigation={navigation}
            editData={selectedSession}
            edit={true}
            getSessionData={getSessionData}
          />
        </Box>
      </Modal>
      <div className="mt-10">
        <div className="flex items-center">
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Select Session
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dropdown}
              label="Select Projects"
              onChange={handleChange}
              className="w-60"
            >
              {sessionData.map((item) => (
                <MenuItem value={item.id}>{item.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
         {localStorage.getItem("role") == "Admin" && <div className="ml-auto">
            <button
              className="w-full bg-blue-600 text-white py-2 px-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                setOpenSession(true);
              }}
            >
              Edit Session
            </button>
          </div>}
        </div>
        <div className="flex gap-5 items-center mt-5 mb-2">
          <div onClick={() => setSession(false)} className="cursor-pointer">
            <MoveLeft />
          </div>
          <div className="font-bold text-2xl">{data.title}</div>
        </div>
        <SelectionTab
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          tabs={tabs}
        />
      </div>
      {selectedTab === "Session PPT" && <PPT data={selectedSession} />}
      {selectedTab === "Overview" && <Overview data={selectedSession} />}
      {selectedTab === "Reflectives" &&
        (!data.submitted_quizzes || data.submitted_quizzes.length == 0 ? (
          <Quiz quizData={data.quizzes} />
        ) : (
          <QuizResults quizData={data.submitted_quizzes} />
        ))}

      {selectedTab === "Assets" && <Asset assets={data.assets} />}
    </div>
  );
}

export default SessionPage;
