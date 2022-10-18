import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { mainAppTheme } from "./"

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={mainAppTheme}>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
