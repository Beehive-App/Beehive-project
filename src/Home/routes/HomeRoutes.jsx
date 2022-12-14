import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../Pages/HomePage'
import { LoginPage } from '../Pages/LoginPage'
import { RegisterPage } from '../Pages/RegisterPage'

export const HomeRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register" element={<RegisterPage />}/>

            <Route path="/*" element={<Navigate to='/notFoundPage'/>}/>
        </Routes>
    
    </>
  )
}
