import ClassroomCard from '../components/ClassroomCard'
import React from 'react'

function ClassroomProject() {
  return (
    <div className='mt-5'>
    <div className='text-xl font-bold'>Classroom Project</div>
    <div className="grid grid-cols-12 gap-4 mt-5">
  <div className="col-span-12 md:col-span-4"><ClassroomCard /></div>
  <div className="col-span-12 md:col-span-4"><ClassroomCard /></div>
  <div className="col-span-12 md:col-span-4"><ClassroomCard /></div>


</div>
    </div>
    
  )
}

export default ClassroomProject