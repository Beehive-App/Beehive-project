import React from 'react'
import { NavBar } from './components';
import {MostUsedMenu} from './components/MostUsedMenu';
import { mainAppTheme } from '../../theme/mainAppTheme'
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { BottomNavigationMobile } from './components/BottomNavigationMobile';

export const BeehiveAppLayout = ({children =<></>}) => {

  const MobileView = useMediaQuery('(max-width:600px)');

  return (
    <>
    <ThemeProvider theme={mainAppTheme} >
      <NavBar />
          {children}
      {
        MobileView && <BottomNavigationMobile />
      }
      
    </ThemeProvider>
  </>
  )
}
