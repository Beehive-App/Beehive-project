import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { logout } from '../../store/auth';


export const VerifyEmailPage = () => {


    const {email} = useSelector(state => state.auth); 
    const dispatch = useDispatch();
    
    const handleLogOut = ()=>{
        dispatch(logout())
    }

  return (
    <>

        <Box    
        height="100%"
        padding={{xs:'10vh',md:'10vh',lg:'15vh'}}
        flexDirection='column'
        sx={{background:"url('/svg/WhiteToHoney-wave.svg')",backgroundSize:"cover",display:"flex"}}
        >
            <Typography variant="h3" fontWeight={'bold'}>
                Verifica tu correo electrónico para continuar. 
            </Typography>
            <Typography variant="h6" marginTop={4}>
                Se ha enviado un enlace de verificación de tu cuenta a la dirección de correo electrónico <strong>{email}</strong>. Haga click en él y vuelva a entrar con sus credenciales para poder acceder al contenido, o bien vuelva a la página principal haciendo click en el botón: 
            </Typography>
            <Button variant="contained" sx={{width:'20vh',marginTop:2}} onClick={handleLogOut}>
                Volver
            </Button>

        </Box>
    
    </>
  )
}
