import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputLabel, List, MenuItem, Select, TextField, ThemeProvider, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { useState } from 'react'
import { BeehiveAppLayout } from '../../../layout/BeehiveAppLayout'
import { SectionCard } from '../components/SectionCard'
import { SidebarSection } from '../components/SidebarSection'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

//data bd
const sect1 = {
  title:"Section Test",
  description:"For Testing",
  color:"linear-gradient(45deg, rgba(255,12,0,1) 0%, rgba(255,149,0,1) 100%)",
  tasks:[
    {
      taskTitle:"Walk the dog",
      taskDescription:"none",
      taskPriority:3,
      taskCompleted:false,
      taskLabels:[''],
      taskDatetime: 1128367890,
    },
    {
      taskTitle:"Go shopping",
      taskDescription:"With my son",
      taskPriority:1,
      taskCompleted:true,
      taskLabels:[''],
      taskDatetime:1118264890,
    }
  ]
}
const sect2 = {
  title:"Section Test number 2",
  description:"For Testing various LIs",
  color:"linear-gradient(45deg, rgba(170,0,255,1) 23%, rgba(42,68,255,1) 100%)",
  tasks:[
    {
      taskTitle:"Walk the dog",
      taskDescription:"none",
      taskPriority:3,
      taskCompleted:false,
      taskLabels:[''],
      taskDatetime: 1128367890,
    },
    {
      taskTitle:"Go shopping",
      taskDescription:"With my son",
      taskPriority:1,
      taskCompleted:true,
      taskLabels:[''],
      taskDatetime:1118264890,
    }
  ]
}
const sect3 = {
  title:"Section Test but with a longer title too see",
  description:"For Testing a longer description and title and how it fits on the sidebar",
  color:"linear-gradient(45deg, rgba(91,255,123,1) 0%, rgba(121,255,224,1) 100%)",
  tasks:[
    {
      taskTitle:"Walk the dog",
      taskDescription:"none",
      taskPriority:3,
      taskCompleted:false,
      taskLabels:[''],
      taskDatetime: 1128367890,
    },
    {
      taskTitle:"Go shopping",
      taskDescription:"With my son",
      taskPriority:1,
      taskCompleted:true,
      taskLabels:[''],
      taskDatetime:1118264890,
    }
  ]
}
const sect4 = {
  title:"Section Test but with a longer title too see",
  description:"For Testing a longer description and title and how it fits on the sidebar",
  color:"#ff00cf",
  tasks:[
    {
      taskTitle:"Walk the dog",
      taskDescription:"",
      taskPriority:3,
      taskCompleted:false,
      taskLabels:[''],
      taskDatetime: 1663966805592,
    },
    {
      taskTitle:"Go shopping",
      taskDescription:"With my son",
      taskPriority:1,
      taskCompleted:false,
      taskLabels:[''],
      taskDatetime:1663966768196,
    },
    {
      taskTitle:"Sacar a Yago",
      taskDescription:"",
      taskPriority:1,
      taskCompleted:false,
      taskLabels:[''],
      taskDatetime:1663967572046,
    },
    {
      taskTitle:"test3",
      taskDescription:"With my son",
      taskPriority:1,
      taskCompleted:false,
      taskLabels:[''],
      taskDatetime:1663967587590,
    }
  ]
}
//data de bd
const userUnlockedColors = [{name:'Pink',color:'#ff00cf'},{name:'Gradient 1',color:'linear-gradient(45deg, rgba(91,255,123,1) 0%, rgba(121,255,224,1) 100%)'},{name:'Gradient 2',color:'linear-gradient(45deg, rgba(170,0,255,1) 23%, rgba(42,68,255,1) 100%)'},{name:'Gradient 3',color:'linear-gradient(45deg, rgba(255,12,0,1) 0%, rgba(255,149,0,1) 100%)'}]

export const TasksMainView = () => {


  const newSectionRef = useRef(); 


  //Abrir y cerrar el dialogo para añadir una sección.
  const [open, setOpen] = useState(false); 
  const handleDialogState = ()=>{
      setOpen(!open); 
      if(!open) setColor(''); 
  }
  //responsive dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  //Cambiar el valor del select para que se muestre. 
  const [color,setColor] = useState(''); 
  const handleColorChange = (e)=>{
    setColor(e.target.value); 
  }


  /* Scrolls sections when needed: */
  const [scroll, setScroll] = useState(0); 
  const handleSectionScrolling = ()=>{
    const [scrollDiv] = document.getElementsByClassName('scroll-sections'); 
    scrollDiv.scroll({
      top: scroll,
      behavior: 'smooth'
    }) 
    //TODO: Mirar porque hay un punto que se bloquea, no se si es casualidad o al llegar a un punto concreto de espacios. (cuando scrollHeight = 778, el máximo que llega es a 777)
    
    if(scrollDiv.offsetHeight + scrollDiv.scrollTop + 100 >= scrollDiv.scrollHeight)
      setScroll(scrollDiv.scrollHeight); 
    else
      setScroll(scroll+100); 
    if (scrollDiv.offsetHeight + scrollDiv.scrollTop >= scrollDiv.scrollHeight) {  
      setScroll(100);
      scrollDiv.scroll({
        top: 0,
        behavior: 'smooth'
      })  
    }
  }

  return (
    <>
        <BeehiveAppLayout>
            <Box className="main-tasks-container" 
            sx={{
                    height:'calc(100% - 64px)',
                    width:1,
                    display:'flex'
                }}>
              {/* DRAWER CON TODAS LAS SECCIONES Y POSIBILIDAD DE CREAR NUEVAS */}
              <Box className="tasks-drawer"
                   sx={{
                    height:'100%',
                    width:"300px",
                    background:'',
                    borderRight:'1px solid #eeeeee'
                   }}
              > 
                {/* Sidebar Title */}
                <Box width={1} minHeight='13%' flexDirection="column" alignItems="center" justifyContent='space-around' padding={{md:2}} background="red" sx={{display:'flex'}}>
                   <Typography textAlign='left'width={1} variant="h5" fontWeight={500} >
                    Tus espacios: 
                   </Typography>
                   <Divider width='100%' />
                </Box>

                {/* Sidebar Items */}
                <Box height={350} className="scroll-sections" sx={{overflowY:"scroll",direction:'rtl'}}>
                   <List >
                    {/* FOREACH / MAP ARRAY CON LAS SECCIONES */}
                    <SidebarSection {...sect1} />
                    <SidebarSection {...sect2} />
                    <SidebarSection {...sect3} />
                    <SidebarSection {...sect4} />

                   </List>
                </Box>
                <Box sx={{width:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',my:3}}>
                  <IconButton sx={{margin:'0 auto'}} onClick={handleSectionScrolling}>
                      <KeyboardArrowDownIcon />
                  </IconButton>
                </Box>
                <Divider/>
              {/* Add section */}
              <Box width={1} minHeight='13%' flexDirection="row" alignItems="center" justifyContent='center' padding={{md:2}} background="red" sx={{display:'flex'}}>
                   
                   <IconButton ref={newSectionRef} onClick={handleDialogState}>
                    <AddCircleIcon color="primary" />
                   </IconButton>
                    <Typography fontSize="19px" 
                              onClick={()=>{newSectionRef.current.click()}}
                              ml={1} 
                              color="text.primary" 
                              sx={{cursor:'pointer',
                              transition:'all .5s ease',
                                  '&:hover':{
                                    color:'primary.main',
                                    transform:'scale(1.08)'
                                  }
                              }}>Añadir espacio</Typography>
                   
                </Box>
              </Box>
              <Box className="tasks-content scroll-sections"
                    sx={{
                      height:'100%',
                      width:"calc(100% - 300px)",
                      background:'',
                      padding:5,
                      display:'flex',
                      flexDirection:'row',
                      flexWrap:'wrap',
                      justifyContent:'flex-start',
                      overflowY:'scroll',
                      
                    }}
                >
                  {/* array map con sections del user traíadas de bd. */}
                    <SectionCard section={sect4} />
                    <SectionCard section={sect1} />
                    <SectionCard section={sect2} />
                    <SectionCard section={sect3} />
                    <SectionCard section={sect4} />
                    <SectionCard section={sect2} />
                    <SectionCard section={sect3} />
                    <SectionCard section={sect1} />
                    <SectionCard section={sect2} />
                    <SectionCard section={sect1} />

              </Box>
            </Box>

            {/* Dialogo de creación de Secciones nuevas: */}
            <Dialog open={open} onClose={handleDialogState} maxWidth="sm" fullWidth fullScreen={fullScreen}>
              <DialogTitle mt={2}>Crear nuevo espacio de tareas:</DialogTitle>
              <DialogContent sx={{padding:'3vh'}}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Título"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Descripción"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <FormControl fullWidth sx={{marginTop:2,padding:'0 !important'}}>
                    <InputLabel id="section-color">Color</InputLabel>
                    <Select
                    labelId="section-color"
                    id="section-color-select"
                    variant='standard'
                    fullWidth
                    value={color}
                    label="Color"
                    onChange={handleColorChange}             
                    >
                    {
                      userUnlockedColors.map(({color,name})=>{
                        return(
                          <MenuItem key={name} value={color} sx={{display:'flex',flexDirection:'row'}}>
                              <Box sx={{background:color,width:25,height:25,borderRadius:999,mr:2}}>
                                &nbsp;
                              </Box>
                              <Typography>
                                {name}
                              </Typography>
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions sx={{padding:'3vh 2vh',}}>
                <Button onClick={handleDialogState}>Cancelar</Button>
                <Button variant="contained" >Crear espacio</Button>
              </DialogActions>
            </Dialog>

        </BeehiveAppLayout>
    </>
  )
}
