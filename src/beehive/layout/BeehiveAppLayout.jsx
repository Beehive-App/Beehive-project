import React from 'react'
import { AppDrawer, NavBar } from './components';
import {MostUsedMenu} from './components/MostUsedMenu';


export const BeehiveAppLayout = ({children =<></>}) => {
  return (
    <>
    <NavBar/>
    <AppDrawer />
        {children}
    <MostUsedMenu />
  </>
  )
}
