import { Button, Typography, Box } from '@mui/material';
import { HomeLayout } from '../Layout/HomeLayout';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


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
          justifyContent="center"
          paddingBottom={{xs:'40vh',md:'30vh'}}
          sx={{
            display: 'flex',
            width:1,
            backgroundColor:'primary.main',
          }}
          >
            <Box className="main-initial-content-title" 
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  display: 'flex',
                }}
                >
              <Typography className="title-clip" fontWeight="bold" fontSize={{xs:'3rem',md:'5rem',lg:'6rem'}} sx={{textAlign:'center'}}>Organízate con Beehive</Typography>
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
          paddingBottom={{xs:'80vh',md:'50vh'}}
          sx={{
            display: 'flex',
            width:1          
          }}
          >
            <Box flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                sx={{
                  display: 'flex',
                  height:'100%',
                  px:3,
                  width:'95%',
                }}>
              
              {/* MODULAR INFO */}
              <Box flexDirection={{xs:"column",md:"row"}}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    width:1,
                  }}
                  >
                <Box flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    width:1,
                  }}>
                  <img src="/svg/modular-icon.svg" width={150}/>
                  <Typography variant="h4" marginTop={{xs:'2vh', md:'2vh'}} marginBottom={{xs:'2vh', md:'3vh'}} className="main-beehive-info">
                    Modular
                  </Typography>
                </Box>
                <Typography variant="h6" >
                  Con beehive podrás acceder a diferentes módulos siempre que lo necesites. Podrás seleccionar los módulos que mas se adapten a tus preferencias y necesidades y así tenerlos mas a mano en el menú principal. No tendrás que perder el tiempo buscando entre un menú infinito la opción que desees, si no que ofrece la posibilidad de que tu te personalices los módulos a los que deseas tener acceso. Si tienes alguna sugerencia acerca de un nuevo módulo que podría venir bien, tan solo escríbelo desde la pestaña de contacto y desde el equipo de Beehive lo meditaremos e intentaremos implementar.
                </Typography>
              </Box>
                

              {/* EASY INFO */}
              <Box flexDirection={{xs:"column",md:"row-reverse"}}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    width:1,
                  }}
                  >
                <Box flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display:'flex',
                    width:1,
                  }}>
                  <img src="/svg/easy-icon.svg" width={150}/>
                  <Typography variant="h4" marginTop={{xs:'2vh', md:'2vh'}} marginBottom={{xs:'2vh', md:'3vh'}} className="main-beehive-info">
                    Sencillo
                  </Typography> 
                </Box>
                <Typography variant="h6"  >
                  Beehive es una aplicación intuitiva y fácil de usar. Da igual si eres un usuario nuevo o un usuario experimentado, gracias a su simple e intuitiva interfaz, cualquier persona se adapta´ra rápidamente a ella y podrá empezar a usarla sin ningún tipo de problema. Aún si te pareciera complicada, también dispones de tutoriales que te ayudan a que tu experiencia en la aplicación sea lo mas agradable posible. 
                </Typography>  
              </Box>

        {/* FAST INFO */}
        <Box flexDirection={{xs:"column",md:"row"}}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    width:1,
                  }}
                  >
                <Box flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    width:1,
                  }}>
                  <img src="/svg/performance-icon.svg" width={150}/>
                  <Typography variant="h4" marginTop={{xs:'2vh', md:'2vh'}} marginBottom={{xs:'2vh', md:'3vh'}} className="main-beehive-info">
                    Rápido
                  </Typography>  
                </Box>
                <Typography variant="h6"  >
                  Gracias a su arquitectura y a su composición con los lenguajes web mas actuales y populares , Beehive ofrece un gran rendimiento para que puedas trabajar con la aplicación de manera fluida y sin atascos. Esto es un aspecto muy importante para el equipo responsable de Beehive, y es por ello que hemos intentado maxificar el rendimiento para que la experiencia del usuario sea lo mas rápido y fluida que nos permiten los recursos.
                </Typography> 
        </Box>
                
    {/* FAST INFO */}
    <Box flexDirection={{xs:"column",md:"row-reverse"}}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    width:1,
                  }}
                  >
                <Box flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    display: 'flex',
                    width:1,
                  }}>
                  <img src="/svg/responsive-icon.svg" width={150}/>
                  <Typography variant="h4" marginTop={{xs:'2vh', md:'2vh'}} marginBottom={{xs:'2vh', md:'3vh'}} className="main-beehive-info">
                   Adaptable
                  </Typography>   
                </Box>
                <Typography variant="h6"  >
                  Sabemos que la gran mayoría de personas no usará Beehive en su version de ordenador, por ello hemos creado esta aplicación de manera que sea adaptable a cualquier tipo de dispositivo y pantalla, ya sea ordenador, móvil o tablet, sobretodo teniendo en cuenta la versión móvil ya que es un medio del que disponemos prácticamente durante todo el día, y así podrás consultar tus tareas en cualquie momento y lugar.  
                </Typography> 
    </Box>              
            {/* FAST INFO */}
            <Box flexDirection={{xs:"column",md:"row"}}
                 alignItems="center"
                 justifyContent="center"
                 sx={{
                      display: 'flex',
                      width:1,
                    }}>
                    <Box flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        display: 'flex',
                        width:1,
                      }}>
                      <img src="/svg/growing-icon.svg" width={150}/>
                      <Typography variant="h4" marginTop={{xs:'2vh', md:'2vh'}} marginBottom={{xs:'2vh', md:'3vh'}} className="main-beehive-info">
                        Creciente
                      </Typography>    
                    </Box>
                    <Typography variant="h6">
                      Beehive es una aplicación que está en constante crecimiento y trabajamos en hacer la aplicación mejor cada día. Si tienes alguna sugerencia o solicitud acerca de  funcionalidades o formas de mejorar la aplicación, te invitamos a que nos escribas una sugerencia en la pestaña de contacto. Esto es algo muy valioso para nosotros ya que el escuchar la opinión directa de nuestros usuarios nos ayuda a seguir adelante y a mejorar la aplicación y que la experiencia sea lo mas buena posible.    
                    </Typography> 
            </Box>      
            </Box>
          </Box>
          <Box className="main-requests"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={{xs:'60vh',md:'10vh'}}
          sx={{
            display: 'flex',
            width:1          
          }}
          >
            <Box flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                sx={{
                  display: 'flex',
                  height:'100%',
                  px:3,
                  width:'95%',
                }}>
                  <Typography variant="h4" className="main-beehive-info" marginTop={{xs:'1vh',md:'5vh'}} >
                  Cómo funcionan las solicitudes:
                  </Typography>
                  <Typography variant="h6" marginTop={{xs:2, md:2}} marginBottom={{xs:2, md:2}} >
                    Debido a que Beehive todavía se encuentra en un periodo de pruebas y de adaptación, no es posible brindar de un acceso ilimitado a todos los usuarios que nos gustaría, por ello la mejor manera de manejar esto es mediante un programa de solicitudes en el que podemos ir dando acceso poco a poco a nuevos usuarios. Para inscribirse en la solicitud es muy sencillo, tan solo haz click en uno de los botones que ofrecen la posibilidad de inscribirse al programa beta. Puedes verlos tanto en la barra de navegación como en la página principal. Una vez pulsado, serás dirigido a una página en la que deberás de añadir tu correo electrónico, ¡Así de sencillo!. Desde Beehive agradecemos la paciencia de los usuarios y esperamos que dentro de poco todo el mundo pueda disfrutar de la aplicación sin límite.
                  </Typography>
                  <Button variant="contained" 
                          sx={{
                              width:'20vh',
                              fontWeight: 'bold',
                              boxShadow:'none !important',
                              "&:hover": {
                                color:'primary.main',
                                background:'transparent',
                                border:"2px solid primary.main !important",
                              }}}>
                    <SendIcon  sx={{marginRight:2}}/>
                    Solicitudes
                  </Button>
                  <Typography variant="h4" className="main-beehive-info" marginTop={{xs:'5vh',md:'5vh'}} >
                    Contacto y ayuda:
                  </Typography>
                  <Typography variant="h6" marginTop={{xs:2, md:2}} marginBottom={{xs:2, md:2}}>
                    ¿Necesitas otro tipo de ayuda? ¿Tienes alguna sugerencia para nosotros? Te invitamos a contactar con nosotros usando los medios que dispone en la página de contacto que puede encontrar en la barra de navegación superior, o bien pulsando el botón que le dejamos abajo, el cúal le redirigirá a la parte donde podrá contactar con nosotros. Si recibimos muchos mensajes es posible que tardemos algo en contestar, pero haremos lo posible por resolver sus dudas o por ayudarle en el menor tiempo posible. Si lo que desea es hacer una sugerencia, también puede hacerlo desde la misma página en la seción bajo el nombre de "Sugerencias de los usuarios".
                  </Typography>

                  {/*  TODO: USEREF EN EL BOTÓN QUE LLEVE A UN ELEMENTO LINK DEL REACT ROUTER DOM QUE ESTE OCULTO EN LA APLICACIÓN*/}
                  
                  <Button variant="contained" 
                          width={{xs:'3vh',md:'12vh'}}
                          sx={{
                              width:'20vh',
                              fontWeight: 'bold',
                              boxShadow:'none !important',
                              "&:hover": {
                                color:'primary.main',
                                background:'transparent',
                                border:"2px solid primary.main !important",
                              }}}>
                    Contacto
                    <SupportAgentIcon sx={{marginLeft:2}}/>
                  </Button>
                </Box>
                <Box margin={{xs:'30vh 0 0 0',md:'50vh 0 0 0 '}}>
                  <img src="/svg/BeehiveLogoBlack-02.svg" width="100px"/>
                  <img src="/svg/BeehiveText-02.svg" width="150px"/>
                </Box>
          </Box> 
      </HomeLayout>
     
    </>
  )
}
