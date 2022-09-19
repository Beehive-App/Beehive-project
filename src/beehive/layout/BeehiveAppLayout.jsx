import React from 'react'
import { AppDrawer, NavBar } from './components';
import {MostUsedMenu} from './components/MostUsedMenu';
import { mainAppTheme } from '../../theme/mainAppTheme'
import { ThemeProvider } from '@mui/material';

export const BeehiveAppLayout = ({children =<></>}) => {
  return (
    <>
    <ThemeProvider theme={mainAppTheme} >
      <NavBar />
          {children}
      <MostUsedMenu />
    </ThemeProvider>
  </>
  )
}
