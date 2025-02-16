
import PPTViewer from '../../../components/PPTViewer'
import SelectionTab from '../../../components/SelectionTab'
import { MoveLeft } from 'lucide-react'
import React, { useState } from 'react'

const PPT = () => {
    return (
        <div>
            <PPTViewer />
        </div>
    )
}

function SessionPage({setSession, renderSession}) {
    const [selectedTab, setSelectedTab] = useState("Overview")
    const tabs = ["Overview", "Session PPT", "Assets", "Reflectives"]
  return (
    <div>

<div className="mt-10">
      <div className="flex gap-5 items-center">
        <div onClick={() => setSession(false)} className="cursor-pointer">
          <MoveLeft />
        </div>
        <div className="font-bold text-2xl">{renderSession}</div>
      </div>
      <SelectionTab setSelectedTab={setSelectedTab} selectedTab={selectedTab} tabs={tabs} />
      </div>
      {selectedTab === "Session PPT" && <PPT />}
    </div>
  )
}

export default SessionPage