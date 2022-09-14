import React from 'react'
import { MainBar } from '../components/MainBar'

export const HomeLayout = ({children}) => {
  
return (
    <>
        <MainBar />

        {children}
    </>
  )
}
