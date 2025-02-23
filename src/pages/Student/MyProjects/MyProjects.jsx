import SelectionTab from '../../../components/SelectionTab'
import React, { useState } from 'react'
import Pending from './Pending'
import Gallery from './Gallery'

function MyProjects() {
  const tabs = ["Pending", "Gallery", "Digital Portfolio"]
  const [selectedTab, setSelectedTab] = useState("Pending")
  return (
    <div>

    <div className='text-xl font-bold mt-5'>My Projects</div>
    <SelectionTab setSelectedTab={setSelectedTab} selectedTab={selectedTab} tabs={tabs} />
    {selectedTab === "Pending" && <Pending />}
    {selectedTab === "Gallery" && <Gallery />}
    </div>
  )
}

export default MyProjects