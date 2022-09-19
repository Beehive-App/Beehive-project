import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BeehiveMainPage } from '../BeehiveMainPage'
// import { TestPage } from '../pages/TestPage'

export const BeehiveRouter = () => {

  return (
    <Routes>
            <Route path="/" element={<BeehiveMainPage />}/>
            {/* <Route path="test" element={<TestPage />}/> */}
            <Route path="/*" element={<Navigate to='/'/>}/>
    </Routes>
  )
}
