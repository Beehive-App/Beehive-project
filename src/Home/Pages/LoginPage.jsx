import { Box, Button, TextField, ThemeProvider, Typography } from '@mui/material'
import { mainAppTheme } from '../../theme/mainAppTheme'
import { useDispatch, useSelector } from "react-redux";
import { HomeLayout } from '../Layout/HomeLayout'
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useForm } from '../../hooks';

const formData = {
  email:'',
  password:'',
};

export const LoginPage = () => {

  const {email, password, onInputChange} = useForm(formData); 

  const dispatch = useDispatch(); 
  const {status} = useSelector(state=>state.auth);
  const isAuthenticating = useMemo(()=> status === 'checking',[status])
  
  const onLoginGoogle = async(e)=>{
    e.preventDefault(); 
    dispatch(startGoogleSignIn());
  }

  const onSubmit = (e)=>{
    e.preventDefault(); 
    dispatch(startLoginWithEmailPassword(email,password)); 
  }

  return (
    <>
    <ThemeProvider theme={mainAppTheme}>
      <HomeLayout>
        <Box className="main-login-form animate__fadeIn" flexDirection="row" justifyContent="center" alignItems="center" sx={{display:'flex',width:1,height:'calc(100% - 90px)'}}>
          <Box flexDirection={{xs:'column',md:'row'}} justifyContent="center" alignItems="center" margin="0 auto" width={{xs:'80%',md:'50%'}} sx={{ display:'flex',height:'80%',borderRadius:3,boxShadow:'11px 26px 117px -16px rgba(199,199,199,1)'}}>
            <Box padding={{xs:'5vh'}} flexDirection="row" justifyContent="center" alignItems="center" height={{xs:'15%',md:"100%"}} width={{xs:'100%',md:"50%"}} borderRadius={{xs:'10px 10px 0px 0',md:'10px 0 0 10px'}}sx={{display:'flex',backgroundColor:'primary.main'}}>
              <img className="form-logo" src="/svg/BeehiveLogoBlack-02.svg"/>
            </Box>
            <form className="login-form animate__animated animate__fadeIn" onSubmit={onSubmit}>
              <Typography variant="h4" fontWeight="bold">Login</Typography>
              <TextField variant="standard" 
                label="Email" 
                type="email" 
                name="email" 
                onChange={onInputChange}
                value={email}
                sx={{width:1,mt:2}}
                />
              <TextField variant="standard" 
                label="Contraseña" 
                type="password" 
                name="password" 
                value={password}
                onChange={onInputChange}
                sx={{width:1,mt:2}}
                />

              <Button variant="contained" type="submit" disabled={(isAuthenticating)} sx={{width:1,mt:4}} >
                Login
              </Button>
              <Box flexDirection="row" alignItems="center" justifyContent="space-between" sx={{mt:1,width:1,display: 'flex'}} >
                <Button variant="contained" sx={{width:'49%'}} onClick={onLoginGoogle} disabled={(isAuthenticating)}>
                <Typography fontSize={{lg:'.9rem'}} display={{xs:'none',lg:'block'}}>Entrar</Typography>
                  <GoogleIcon sx={{mx:1}}/>
                </Button>
                <Button variant="contained" sx={{width:'49%'}} disabled={(isAuthenticating)}>
                <Typography fontSize={{lg:'.9rem'}} display={{xs:'none',lg:'block'}}>Entrar</Typography>
                  <AppleIcon sx={{mx:1}}/>
                </Button>
              </Box>
              <Link className="form-link" to="/home/register">¿No tienes cuenta? Pulsa aquí para registrarte. </Link>
            </form>
          </Box>
        </Box>
      </HomeLayout>
    </ThemeProvider>
    </>
  )
}
