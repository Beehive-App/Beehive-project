import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BeehiveMainPage } from '../BeehiveMainPage'
import { TasksMainView } from '../modules/tasks/views/TasksMainView'

export const BeehiveRouter = () => {

  return (
    <Routes>
            <Route path="/" element={<BeehiveMainPage />}/>
            <Route path="/tasks" element={<TasksMainView />}/>
            {/* <Route path="test" element={<TestPage />}/> */}
            <Route path="/*" element={<Navigate to='/'/>}/>
    </Routes>
  )
}
