import { AddTask, CenterFocusStrongOutlined, CheckCircle, Circle, Delete, Edit, FirstPage, HorizontalRule, Info, PriorityHigh, Settings } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Tab, Tabs, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers';
import { isSameDay } from 'date-fns/esm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../../../hooks/useForm';
import { setActiveTab, setTasks, unsetActiveSection } from '../../../../store/Tasks/tasksSlice'
import { updateSection } from '../../../../store/Tasks/thunks';
import { TabPanel } from '../../../components/TabPanel';
import { TinyCalendar } from '../components/TinyCalendar';
import { CompletedTasksView } from './CompletedTasksView';
import { UncompletedTasksView } from './UncompletedTasksView';

let formData = {
  description:'',
  priority:0,
  taskId:''
}

//tabs props
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const TaskSectionView = () => {
 
  const dispatch = useDispatch(); 
  const {activeDay,activeSection,activeTab} = useSelector(state=>state.tasks);   
  const {sectionTitle,sectionDescription,tasks} = activeSection; 


  const onCompleteTask = (task)=>{  

    let newTasks = []; 
    tasks.map(tsk=>{

      tsk.tid == task.tid 
      ? newTasks.push({...tsk,completed:true})
      : newTasks.push({...tsk});
    })
    dispatch(setTasks(newTasks));
    dispatch(updateSection())
    
  }

  //useForm 
  const {taskId,description,onInputChange,setFormState,formState} = useForm(formData)

  //date picker:
  const currentDay = (activeDay!=null) ? new Date(activeDay) : new Date();

  const [dateValue, setDateValue] = useState(currentDay);
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
    setFormState({
      ...formState,
      endDate:new Date(newValue).getTime(),
    })
  };
  const [priority,setPriority] = useState(0);
  const handlePriorityChange = (e)=>{
    setPriority(e.target.value); 
    setFormState({
      ...formState,
      taskPriority:e.target.value
    })
  }
  const MobileView = useMediaQuery('(max-width:600px)');
  const [isUpdating,setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false); 
  const handleDialogState = ()=>{
      setOpen(!open); 
      if(!open){
        setPriority(0)
        setDateValue(currentDay);
        setFormState({
         description:'',taskPriority:0,endDate:activeDay
        });
      }
  }
  /* UPDATE DE LAS TAREAS */
  const [openUpdate,setOpenUpdate] = useState(false);
  const handleUpdateDialog = ({priority,endDate,description,tid})=>{  
    setOpenUpdate(!openUpdate); 
    setIsUpdating(!isUpdating);
    setPriority(priority)
    setDateValue(endDate);
    setFormState({
     description:description,taskPriority:priority,endDate:endDate,taskId:tid
    });
    if(!openUpdate){
        setIsUpdating(false);
        console.log({isUpdating})
    }
}

const onUpdateTask = () =>{
  const {taskId,taskPriority,description,endDate} = formState;
  let newTasks = []; 
  tasks.map(tsk=>{
    tsk.tid == taskId 
    ? newTasks.push({priority:taskPriority,completed:false,description,endDate,tid:taskId})
    : newTasks.push({...tsk});
  })
  dispatch(setTasks(newTasks));
  dispatch(updateSection())
  setOpenUpdate(false);
}
const onDeleteTask = (task) =>{
  let newTasks = []; 
  tasks.map(tsk=>{
    tsk.tid != task.tid && newTasks.push({...tsk});
  })
  dispatch(setTasks(newTasks));
  dispatch(updateSection())
}
  //TabPanel handler:
  const [tabValue,setTabValue] = useState(activeTab);

  const handleTabChange = (event, newValue)=>{
    setTabValue(newValue);
    dispatch(setActiveTab(newValue));
  }

  //responsive dialog
  const fullScreen = useMediaQuery('(max-width:600px)');
  
  //get tasks from a date and other date operations: 
  const datetime = new Date(activeDay); 
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const tasksTitle = activeDay!=null ? `Tareas del ${datetime.toLocaleDateString('es-ES',options)}:` : 'Todas tus tareas:' ;

  // (Array.isArray(sectionTasks) && sectionTasks.length) a la hora de pintar en jsx.
  const sectionTasks =  activeDay == null ? tasks : tasks.filter(task => isSameDay(activeDay,task.endDate) && !task.completed); 
  const orderedTasks = (Array.isArray(sectionTasks) && sectionTasks.length) ? [...sectionTasks].sort((a,b)=> a.priority - b.priority || a.endDate - b.endDate) : []; 

  const handleUnsetActive = ()=>{
    dispatch(unsetActiveSection()); 
  }

  const onNewTask = async()=>{
    const {taskPriority,endDate} = formState;
    console.log(taskPriority,endDate)

    const newTask = {
      tid:"id" + Math.random().toString(16).slice(2),
      description,
      completed:false,
      endDate,
      priority:taskPriority,
    }
    console.log({pre:activeSection});
    console.log({tasks})
    const newTasksArray = [...tasks,newTask];
    console.log({newTasksArray})


    dispatch( setTasks(newTasksArray) );
    
    console.log({post:activeSection});
    dispatch( updateSection() );
    handleDialogState()
  }

  return (
    <>
        <Box className="main-tasks-container animate__animated animate__fadeIn" 
             sx={{
                height:'calc(100% - 64px)',
                width:1,
                display:'flex',
                }}>
          <Box className="calendar-drawer"
               sx={{
                height:'100%',
                width:"370px",
                background:'',
                borderRight:'1px solid black',
                padding:1,
                background:"white"
               }}
          >
               <TinyCalendar />
               <List sx={{mt:5}}>
                <Divider />
                <ListItemButton onClick={handleUnsetActive}>
                  <ListItemText primary="Volver a tus Espacios" />
                  <FirstPage color="primary"/>
                </ListItemButton>
                <Divider />
                <ListItemButton >
                  <ListItemText primary="Configuración de Espacio" />
                  <Settings color="primary" />
                </ListItemButton>
                <Divider />

               </List>
          </Box>
          
          <Box className="tasks-content animate__animated animate__fadeIn"
                sx={{
                  height:'100%',
                  width:"calc(100% - 300px)",
                  background:'#f1f1f1',
                  padding:3,
                  
                }}
            >
            <Box className="animate__animated animate__fadeIn"
                sx={{
                  height:'100%',
                  width:"100%",
                  background:'white',
                  padding:5,
                  borderRadius:'9px'
                  
                }}>
              <Typography variant="h4" >
                <strong> {sectionTitle} </strong>
              </Typography>
              <Typography variant="h6" color="text.secondary">
                 <strong> {sectionDescription} </strong>
              </Typography>
              <Divider />

              <Box sx={{ borderBottom: 1, borderColor: 'divider',display:'flex',justifyContent:'center',background:"" }}>
              <Tabs textColor="secondary" indicatorColor="secondary" value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label={`Tareas ${new Date(activeDay).toLocaleDateString('es-ES',{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}`} {...a11yProps(0)} />
                <Tab label="Tareas Completadas" {...a11yProps(1)} />
                <Tab label="Todas las Tareas" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0} >
              <Box pt={5}>
              <Typography variant="h5" mb={2} className="animate__animated animate__fadeIn"  >
                { tasksTitle }
              </Typography>
              <Divider />
              <Box className="tasks-wrapper" height={{xs:'300px',md:'',lg:''}}>
                {
                orderedTasks.length 
                ?                
                  <Box className="animate__animated animate__fadeIn"  sx={{display:'flex',flexDirection:'row',width:1,alignItems:'center',justifyContent:'space-between',mt:1,mb:1}}>
                    <Typography variant="h6" sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',fontWeight:'bold'}}>
                      Descripción:
                    </Typography>
                    <Box className="animate__animated animate__fadeIn"  sx={{display:'flex',flexDirection:'row',width:'20%',alignItems:'center',justifyContent:'space-between'}}>
                      <Typography variant="h6" fontWeight='bold'>
                        Prioridad
                      </Typography>
                    </Box>                      
                  </Box> 
                  : <></>
                }
                <Divider />
                {
                (Array.isArray(orderedTasks) && orderedTasks.length) 
                ? orderedTasks.map(task=>{

                  const tooltip = (task.priority == 0) 
                                  ? 'Esta tarea no es urgente.' 
                                  : (task.priority == -1) 
                                    ? 'Esta tarea es poco urgente.' 
                                    : (task.priority == -2) 
                                    ?'Esta tarea es bastante urgente.' 
                                    : 'Esta tarea es muy urgente.' //(-3)

                  return(
                    <>
                      <Box className="animate__animated animate__fadeIn"  sx={{display:'flex',flexDirection:'row',width:1,alignItems:'center',justifyContent:'space-between',mt:1,mb:1}}>
                        <Box width="75%">
                          <Typography fontSize={{md:'1.2rem'}} sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',textDecoration:task.completed?'line-through':'none'}}>
                              <Circle color="primary" sx={{mr:1,width:'15px',height:'15px',}} /> {task.description}
                          </Typography>
                          <Typography fontSize={{md:'1.2rem'}} sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                              {new Date(task.endDate).toLocaleTimeString('en-GB',{ hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                        <Box className="animate__animated animate__fadeIn"  sx={{display:'flex',flexDirection:'row',width:'19%',alignItems:'center',justifyContent:'space-between'}}>
                          <Tooltip title={tooltip} sx={{width:'25%'}}>
                            <IconButton>
                              {
                                (task.priority == 0) 
                                ? <HorizontalRule sx={{color:'#3EB3FF'}} /> 
                                : (task.priority == -1) 
                                  ? <PriorityHigh sx={{color:'#cceb34'}} />
                                  : (task.priority == -2) 
                                  ? <><PriorityHigh sx={{color:'#faa825'}}/><PriorityHigh sx={{color:'#faa825'}}/></>
                                  : <><PriorityHigh color="error"/><PriorityHigh color="error"/><PriorityHigh color="error"/></>
                              }
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Completar tarea">
                              <IconButton onClick={()=>onCompleteTask(task)}>
                                <CheckCircle sx={{transition:"all .3s ease",'&:hover':{color:"#63ff76",}}}/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Modificar tarea">
                              <IconButton onClick={()=>handleUpdateDialog(task)}>
                                <Edit sx={{transition:"all .3s ease",'&:hover':{color:"#fcd703",}}}/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Borrar tarea">
                              <IconButton onClick={()=>onDeleteTask(task)}>
                                <Delete sx={{transition:"all .3s ease",'&:hover':{color:"#e6454a",}}}/>
                              </IconButton>
                            </Tooltip>
                        </Box>
                      </Box>
                      <Divider />
                    </>
                  )
                })
                :  <Box className="animate__animated animate__fadeIn animate__faster"  width={1} height={'50vh'} sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Typography variant="h5" color="text.secondary" sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                            <Info color="primary" sx={{mr:1,width:35,height:35}} /> Parece que no tienes tareas para este día. ¿Por qué no pruebas a añadir una?
                    </Typography>
                  </Box>
                }
              </Box>
              </Box>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <CompletedTasksView />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <UncompletedTasksView />
            </TabPanel>
              <Fab onClick={handleDialogState} variant="extended" color="primary" aria-label="add" sx={{ fontWeight:'bold',position: 'absolute', bottom: 35, right:35 }}>
                <AddTask sx={{mr:1}}/>
                Añadir tarea
              </Fab>   
            </Box>
          </Box>
        </Box>    
        <Dialog open={open} onClose={handleDialogState} maxWidth="lg" fullWidth fullScreen={fullScreen}>
              <DialogTitle mt={2} fontSize={'2rem'} sx={{paddingLeft:'5vh'}}>Nueva Tarea</DialogTitle>
              <DialogContent sx={{padding:'5vh'}}>
                <TextField
                  margin="dense"
                  label="Descripción"
                  type="text"
                  fullWidth
                  variant="standard"
                  name="description" 
                  value={description}
                  onChange={onInputChange}
                  // error={!!sectionTitleValid && formSubmited}
                />
                <Box flexDirection='row' justifyContent={'flex-start'} alignItems={'flex-end'} width={1} sx={{display:'flex',mt:2}}>
                  <DateTimePicker
                    label="Fecha y hora (mm/dd/aa)"
                    value={dateValue}
                    name="endDate"
                    onChange={handleDateChange}
                    
                    renderInput={(params) => <TextField disabled={true} variant='standard'{...params} sx={{mr:5,width:350}}/>}
                  />
                  <FormControl fullWidth sx={{marginTop:2,padding:'0 !important'}}>
                      <InputLabel id="section-color">Prioridad</InputLabel>
                      <Select
                      labelId="section-color"
                      id="section-color-select"
                      variant='standard'
                      value={priority}
                      label="Color" 
                      onChange={handlePriorityChange}    
                      sx={{width:350}}        
                      >
                        <MenuItem value={0}>Ninguna</MenuItem>
                        <MenuItem value={-1}>Baja</MenuItem>
                        <MenuItem value={-2}>Media</MenuItem>
                        <MenuItem value={-3}>Alta</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions sx={{padding:'3vh 2vh',}}>
                <Button onClick={handleDialogState}>Cancelar</Button>
                <Button variant="contained" onClick={onNewTask} >Añadir Tarea</Button>
              </DialogActions>
        </Dialog>
        <Dialog open={openUpdate} onClose={handleUpdateDialog} maxWidth="lg" fullWidth fullScreen={fullScreen}>
              <DialogTitle mt={2} fontSize={'2rem'} sx={{paddingLeft:'5vh'}}>Nueva Tarea</DialogTitle>
              <DialogContent sx={{padding:'5vh'}}>
              <TextField
                  margin="dense"
                  label="taskId"
                  type="text"
                  hidden
                  variant="standard"
                  name="taskId"
                  value={taskId}
                  sx={{display:'none'}}
                  // error={!!sectionTitleValid && formSubmited}
                />
                <TextField
                  margin="dense"
                  label="Descripción"
                  type="text"
                  fullWidth
                  variant="standard"
                  name="description" 
                  value={description}
                  onChange={onInputChange}
                  // error={!!sectionTitleValid && formSubmited}
                />
                <Box flexDirection='row' justifyContent={'flex-start'} alignItems={'flex-end'} width={1} sx={{display:'flex',mt:2}}>
                  <DateTimePicker
                    label="Fecha y hora (mm/dd/aa)"
                    value={dateValue}
                    name="endDate"
                    onChange={handleDateChange}
                    
                    renderInput={(params) => <TextField disabled={true} variant='standard'{...params} sx={{mr:5,width:350}}/>}
                  />
                  <FormControl fullWidth sx={{marginTop:2,padding:'0 !important'}}>
                      <InputLabel id="section-color">Prioridad</InputLabel>
                      <Select
                      labelId="section-color"
                      id="section-color-select"
                      variant='standard'
                      value={priority}
                      label="Color" 
                      onChange={handlePriorityChange}    
                      sx={{width:350}}        
                      >
                        <MenuItem value={0}>Ninguna</MenuItem>
                        <MenuItem value={-1}>Baja</MenuItem>
                        <MenuItem value={-2}>Media</MenuItem>
                        <MenuItem value={-3}>Alta</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions sx={{padding:'3vh 2vh',}}>
                <Button onClick={handleUpdateDialog}>Cancelar</Button>
                <Button variant="contained" onClick={onUpdateTask} >Actualizar Tarea</Button>
              </DialogActions>
        </Dialog>
</>
  )
}
