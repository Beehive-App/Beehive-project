import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { HomeLayout } from '../Layout/HomeLayout'


export const HomePage = () => {

  // const theme = useTheme(mainAppTheme); 
  // console.log({theme})
  // const mainColor = theme.palette.primary.main; 

  return (
    <>

      <HomeLayout>

          <Box 
          className="main-initial-content" 
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          height={{xs :'135vh',md:'100vh'}}
          sx={{
              display: 'flex',
              width:1,
              backgroundColor:'primary.main',
            }}
              >


            <Box className="main-initial-content-title" 
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                sx={{
                  display: 'flex',
                  mt:9
                }}
                >
              <Typography fontWeight="bold" fontSize={{xs:'3rem',md:'5rem',lg:'6rem'}} sx={{textAlign:'center'}}>Organízate con Beehive</Typography>
              <Typography variant="h6" sx={{px:3, textAlign:'center'}} >Beehive es una aplicación que te ayudará a llevar un seguimiento de tus actividades para que te organices los meses, semanas o días de la mejor manera posible. Solicita ahora tu cuenta y entra en el programa beta para experimentar la aplicación en primera persona.</Typography>
              <Button variant="contained" 
                      sx={{
                        marginTop:3,
                        fontWeight:'bold',
                        boxShadow:'none !important',
                        fontSize:'1.1rem',
                        "&:hover": {
                          color:'primary.main',
                          background:'transparent',
                          border:"2px solid primary.main !important",
                          }}} 
                          >
                  Solicita Acceso
              </Button>
            </Box>
          </Box>

          {/* INFO: test para ver como queda esto.*/ }
          <Box className="main-info"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            display: 'flex',
            height:'40vh'
            
          }}
          >
          <Typography variant="h4" fontWeight="bold" color="" >
            Cómo funciona Beehive:
          </Typography>

          </Box>

      </HomeLayout>
     
    </>
  )
}
