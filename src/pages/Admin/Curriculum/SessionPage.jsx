
import Quiz from '../../../components/Quiz'
import PPTViewer from '../../../components/PPTViewer'
import SelectionTab from '../../../components/SelectionTab'
import { MoveLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getAPI } from '../../../request/APIManager'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const PPT = ({data}) => {
    return (
        <div>
            <PPTViewer data={data} />
        </div>
    )
}



const Overview = ({data}) => {
  console.log("DATA = ", data)
  return (
    <div>
        <p className='font-bold text-xl mt-5'>{data.title}</p>
        <p className='text-gray-500 mt-5'>- {data.overview_text}</p>
    </div>
  )

}

function SessionPage({setSession, renderSession, data, navigation}) {
    const [selectedTab, setSelectedTab] = useState("Overview")
    const tabs = ["Overview", "Session PPT", "Assets", "Reflectives"]
    const [dropdown, setDropdown] = useState("");
    const [sessionData, setSessionData] = useState([])
    const [selectedSession , setSelectedSession] = useState({})
    
    const getSessionData = async () => {
      const response = await getAPI(navigation, "projects/project-sessions/")
      setSessionData([...response])
      setDropdown(response[0].id)
      setSelectedSession(response[0])
  }
  
    useEffect((
     
    ) => {
      getSessionData()
    }, [])
    console.log("yaya - ", data)
    const handleChange = (value) => {
      setDropdown(value.target.value);
      const item = sessionData.find(item => item.id === value.target.value);
      setSelectedSession({...item})
      
    };
  
    if (sessionData.length == 0) {
      return (<p>No Session Data Found!</p>)
    }
  return (
    <div>

<div className="mt-10">
<FormControl>
              <InputLabel id="demo-simple-select-label">Select Session</InputLabel>
              <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dropdown}
                    label="Select Projects"
                    onChange={handleChange}
                    className="w-60"
                  >
                    
                   { sessionData.map((item) => 
                   
                   (<MenuItem value={item.id}>{item.title}</MenuItem>))}
                  </Select>
                  </FormControl>
      <div className="flex gap-5 items-center">
         
        <div onClick={() => setSession(false)} className="cursor-pointer">
          <MoveLeft /> 
        </div>
        <div className="font-bold text-2xl">{data.title}</div>
      </div>
      <SelectionTab setSelectedTab={setSelectedTab} selectedTab={selectedTab} tabs={tabs} />
      </div>
      {selectedTab === "Session PPT" && <PPT data={selectedSession}/>}
      {selectedTab === "Overview" && <Overview data={selectedSession} />}
      {selectedTab === "Reflectives" && <Quiz quizData={data.quizzes}/>}


    </div>
  )
}

export default SessionPage