import { Box, Button, TextField, ThemeProvider } from '@mui/material'
import { mainAppTheme } from '../../theme/mainAppTheme'
import { HomeLayout } from '../Layout/HomeLayout'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

export const LoginPage = () => {
  return (
    <>
    <ThemeProvider theme={mainAppTheme}>
      <HomeLayout>
        <Box className="main-login-form" flexDirection="row" justifyContent="center" alignItems="center" sx={{display:'flex',width:1,height:'calc(100% - 90px)'}}>
          <Box flexDirection="row" justifyContent="center" alignItems="center" margin="0 auto" sx={{ display:'flex',width:1/2,height:'80%',borderRadius:3,boxShadow:'11px 26px 117px -16px rgba(199,199,199,1)'}}>
            <Box flexDirection="row" justifyContent="center" alignItems="center" sx={{display:'flex',width:'50%',height:"100%",backgroundColor:'primary.main',borderRadius:'10px 0 0 10px'}}>
              <img src="/svg/BeehiveLogoBlack-02.svg" width="120px"/>
            </Box>
            <form className="login-form">
              <TextField variant="standard" label="Email"/>
              <TextField variant="standard" label="Contraseña"/>
              <Button variant="contained" >
                Login
              </Button>
              <Button variant="contained">
                Entrar con google
                <GoogleIcon />
              </Button>
              <Button variant="contained">
                Entrar con Apple
                <AppleIcon />
              </Button>
            </form>

          </Box>
        </Box>
      </HomeLayout>
    </ThemeProvider>
    </>
  )
}
