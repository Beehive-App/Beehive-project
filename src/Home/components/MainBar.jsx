import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import LoginIcon from '@mui/icons-material/Login';
import React from 'react'

//TODO: THIS VARS SHOULD BE PASSED AS PROPS TO THE MAINBAR COMPONENT
//INFO : Esto es para que en el proyecto final, muestre como pasandole propiedades puedo generarme este componente y reutilizarlo en otra app cualquiera. (vendría de las props, igual que los elementos del menú (serán los módulos que el usuario tenga activos en base de datos.))
const menuItems = ['Home','Información','Contacto','Solicitudes'];
const [LogoIcon,LogoText] = [{srcImg:'/svg/BeehiveLogoHoney-02.svg',altImg:'Beehive Logo Icon'},{srcImg:'/svg/BeehiveText-02.svg',altImg:'Beehive Logo Text'}] 

export const MainBar = () => {
  return (
    <>
        <AppBar position="static" sx={{backgroundColor:'#ffffff'}}>
        <Toolbar sx={{height:'90px'}}>
            <Grid container  
                  spacing={0}
                  flex 
                  flexDirection="row" 
                  alignItems="center" 
                  justifyContent="space-between" 
                  sx={{width:'100%'}}
                  >

                <Grid item 
                      className="Beehive-mainbar-logo" 
                      sx={{width:'25%',display:'flex'}}
                      >
                    <Box display={{xs: "none", lg:"flex"}} marginLeft={{lg:'40px'}} >
                      <img src={LogoIcon.srcImg} width="80px" alt={LogoIcon.altImg} className="Logo-mainbar"/>
                      <img src={LogoText.srcImg} width="130px" alt={LogoText.altImg} className="Logo-mainbar"/>
                    </Box>
                    <Box flexDirection="column"  alignItems="center" justifyContent="center" display={{xs: "flex",lg:"none" }} width={{xs:'50px',md:"70px"}} height={{xs:'50px',md:"70px"}} marginLeft={{xs:'10px'}} >
                      <img src={LogoIcon.srcImg} width="100%" alt={LogoIcon.altImg}/>
                    </Box>
                </Grid>
                
                <Grid item 
                      className="Beehive-mainbar-menu" 
                      sx={{width:'50%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                        {
                          menuItems.map(item=>{
                            let active = false; 

                            //TODO: Hacer la lógica para leer la url y ver si coincide con la key uno de los elementos del array de objetos de menú. 
                            if(item == 'Home') active = true; 
                            
                            return(
                              <Box 
                              className='mainbar-menu-item'
                              key={item} 
                              fontSize={{xs:'1rem',lg:'1.2rem'}} 
                              margin={{xs:'0 2px 0 2px',md:'0 10px 0 10px'}}
                              sx={{
                                    display:'flex',
                                    flexDirection:"row"
                                   }}  >
                                <Typography 
                                fontSize={{xs:'0.7rem',md:'1rem',lg:'1.2rem'}} 
                                sx={{
                                    fontWeight:(active?'bold':''),
                                    color:(active ?'primary.main':''),
                                    transition:".3s ease",
                                    "&:hover": {
                                      color:'primary.main',
                                      transform:'scale(1.05)'
                                    }
                                    }}
                                >
                                  {item}
                                </Typography>
                              </Box>
                            )
                          })
                        }
                </Grid>
                <Grid item flex flexDirection="row" alignItems="center" justifyContent="flex-end" sx={{height:1,width:'25%',display:'flex',paddingRight:'40px'}} >
                      <Box display={{xs:'none',md:'flex'}}>
                        <Button 
                        variant="contained" 
                        sx={{
                            fontWeight:'bold',
                            boxShadow:'none !important',
                            "&:hover": {
                              color:'primary.main',
                              background:'transparent',
                              border:"2px solid primary.main !important",
                                    }}} 
                                    >
                          Inicia Sesión
                        </Button>
                      </Box>
                    <Box display={{xs:'flex',md:'none'}} flexDirection='column' >
                        <IconButton sx={{color:'white',width:'4vh',height:'4vh',backgroundColor:'primary.main'}} padding={'10px 10px'}>
                          <LoginIcon sx={{padding:'3px'}} className="LoginIconButton" />
                        </IconButton>
                      <Typography fontSize='.7rem' fontWeight='bold' color="primary.main">Login</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Toolbar>
        </AppBar>
    </>
  )
}
