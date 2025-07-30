import React from 'react'

function SelectionTab({selectedTab, setSelectedTab, tabs}) {
  return (
    <div><div className="flex mt-2">
        {tabs.map((tab, index) => (
            <div
            key={index}
            className={`rounded-t-md justify-center flex border-b-2 border-custom-blue ${
              selectedTab == tab
                ? "bg-custom-orange-dark "
                : "bg-sky-100"
            } px-2 py-1 hover:cursor-pointer content-center gap-2`}
            onClick={() => setSelectedTab(tab)}
          >
            
            <span>{tab}</span>
          </div>
        ))}
  </div>
  <div className="border border-grey"></div></div>
  )
}

export default SelectionTab