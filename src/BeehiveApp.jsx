import { SnackbarProvider } from 'notistack'
import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'

export const BeehiveApp = () => {
  return (
    <>  

      <AppTheme>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <AppRouter />
        </SnackbarProvider>
      </AppTheme>

    </>
  )
}
