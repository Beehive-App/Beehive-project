import { Box, Button, Snackbar, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { HomeLayout } from '../Layout/HomeLayout'
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { mainAppTheme } from '../../theme';
import { registerUserWithEmailPassword } from '../../firebase/Providers';
import {useForm} from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  displayName:'',
  email:'',
  password:''
}

//default pattern accepted. "aa@domain.co"
const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

// At least one digit, at least one upper and one lower case and 8 length minimun
const regExPassw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const formValidations = {
    email: [(value)=>value.match(regExEmail),'El email debe de tener un formato válido del tipo "example@example.com"'],
    password: [(value)=>value.match(regExPassw),'La contraseña debe de contener mínimo de: 8 caracteres, uno en mayúscula, uno en minúscula'],
    displayName: [(value)=>value.length>=1,'El Nombre es obligatorio'],
}

export const RegisterPage = () => {

  const {enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();
  const {
    displayName, 
    email, 
    password, 
    onInputChange, 
    formState, 
    isFormValid, 
    emailValid, 
    passwordValid, 
    displayNameValid
  } = useForm(formData,formValidations)

  const dispatch = useDispatch(); 

  const {status,errorMessage} = useSelector(state => state.auth); 

  const isCheckingAuth = useMemo( () => status === 'checking', [status] ); 
  const [formSubmited, setFormSubmited] = useState(false)

  const handleSnacks = (message,variant)=>{
    enqueueSnackbar(message,{variant}); 
  }

  const onSubmit = async(e)=>{
    e.preventDefault(); 
    setFormSubmited(true); 

    !!passwordValid && handleSnacks(passwordValid,"error");
    !!emailValid && handleSnacks(emailValid,"error");
    !!displayNameValid && handleSnacks(displayNameValid,"error");

    if (!!emailValid && !!passwordValid && !!displayNameValid ) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <>
    <ThemeProvider theme={mainAppTheme}>
      <HomeLayout>

          <Box className="main-register-form animate__fadeIn" flexDirection="row" justifyContent="center" alignItems="center" sx={{display:'flex',width:1,height:'calc(100% - 90px)'}}>
            <Box flexDirection={{xs:'column',md:'row'}} justifyContent="center" alignItems="center" margin="0 auto" width={{xs:'80%',md:'50%'}} sx={{ display:'flex',height:'80%',borderRadius:3,boxShadow:'11px 26px 117px -16px rgba(199,199,199,1)'}}>
              <Box padding={{xs:'5vh'}} flexDirection="row" justifyContent="center" alignItems="center" height={{xs:'15%',md:"100%"}} width={{xs:'100%',md:"50%"}} borderRadius={{xs:'10px 10px 0px 0',md:'10px 0 0 10px'}}sx={{display:'flex',backgroundColor:'primary.main'}}>
                <img className="form-logo" src="/svg/BeehiveLogoBlack-02.svg"/>
              </Box>
              <form onSubmit={onSubmit} className="register-form animate__animated animate__fadeIn">
                <Typography variant="h4" fontWeight="bold">Registro</Typography>
                <TextField variant="standard" 
                  label="Email" 
                  type="email" 
                  name="email" 
                  onChange={onInputChange}
                  value={email}
                  error={!!emailValid && formSubmited}
                  sx={{width:1,mt:2}}
                  />
                <TextField variant="standard" 
                  label="Nombre de usuario" 
                  type="text" 
                  name="displayName" 
                  onChange={onInputChange}
                  value={displayName}
                  error={!!displayNameValid && formSubmited}
                  sx={{width:1,mt:2}}
                  />
                <TextField variant="standard" 
                  label="Contraseña" 
                  type="password" 
                  name="password" 
                  onChange={onInputChange}
                  value={password}
                  error={!!passwordValid && formSubmited}
                  sx={{width:1,mt:2}}
                  />

                <Button variant="contained" type="submit" sx={{width:1,mt:4}} >
                  Registrarse
                </Button>
                <Link className="form-link" to="/home/login">¿Ya tienes cuenta? Pulsa aquí para acceder. </Link>
              </form>
              
            </Box>
          </Box>
      </HomeLayout>
    </ThemeProvider>
    </>
  )
}
