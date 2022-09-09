import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../global/Pages/NotFoundPage'
import { HomeRoutes } from '../Home/routes/HomeRoutes'

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/home/*" element={<HomeRoutes />}/>
        <Route path="/notFoundPage" element={<NotFoundPage />} />
        <Route path="/*" element={<Navigate to='/notFoundPage'/>}/>
    </Routes>
  )
}
