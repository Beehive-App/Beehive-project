import { Circle, Info } from '@mui/icons-material';
import { Divider, IconButton, Typography,Box } from '@mui/material';
import { isSameDay } from 'date-fns';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const CompletedTasksView = () => {
    const dispatch = useDispatch(); 
    const {activeDay,activeSection} = useSelector(state=>state.tasks); 
    const {sectionTitle,sectionDescription,tasks} = activeSection;   
    
    //get tasks from a date and other date operations: 
  const datetime = new Date(activeDay); 
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const tasksTitle = 'Todas las tareas completadas:' ;

  // (Array.isArray(sectionTasks) && sectionTasks.length) a la hora de pintar en jsx.
  const completedTasks =  activeDay == null ? tasks : tasks.filter(task => task.completed); 
  const orderedTasks = (Array.isArray(completedTasks) && completedTasks.length) ? [...completedTasks].sort((a,b)=> b.endDate - a.endDate) : []; 
  
    let currentDay = 0; 

return (
    <>
        <Box pt={5} height={{xs:'65vh',md:'65vh',lg:'65vh'}}>
              <Typography variant="h5" mb={2} className="animate__animated animate__fadeIn"  >
                { tasksTitle }
              </Typography>
              <Divider />
              <Box className="tasks-wrapper" height={{xs:'75%',md:'75%',lg:'75%'}}>
                {
                (Array.isArray(orderedTasks) && orderedTasks.length) 
                ? orderedTasks.map(task=>{
                    if(!isSameDay(task.endDate,currentDay)){
                        currentDay = task.endDate;
                        return (
                            <>
                            <Box className="animate__animated animate__fadeIn"  sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                <Typography fontSize={{md:'1.3rem'}}>
                                    {new Date(task.endDate).toLocaleDateString('ES-es',options).charAt(0).toUpperCase() + new Date(task.endDate).toLocaleDateString('ES-es',options).slice(1)}
                                </Typography>
                            </Box>
                            <Box className="animate__animated animate__fadeIn"  sx={{display:'flex',flexDirection:'row',width:1,alignItems:'center',justifyContent:'space-between',mt:1,mb:1}}>
                                <Typography color="text.secondary" fontSize={{md:'1.2rem'}} sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',textDecoration:task.completed?'line-through':'none'}}>
                                    <Circle color="primary" sx={{mr:1,width:'15px',height:'15px',}} /> {task.description}
                                </Typography>
                            </Box>
                            <Divider />
                            </>
                        )
                    }
                    else{
                        return (
                            <>
                              <Box className="animate__animated animate__fadeIn"  sx={{display:'flex',flexDirection:'row',width:1,alignItems:'center',justifyContent:'space-between',mt:1,mb:1}}>
                                <Typography color="text.secondary" fontSize={{md:'1.2rem'}} sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',textDecoration:task.completed?'line-through':'none'}}>
                                    <Circle color="primary" sx={{mr:1,width:'15px',height:'15px',}} /> {task.description}
                                </Typography>
                              </Box>
                              <Divider />
                            </>
                          )
                    }
                })
                :  <Box className="animate__animated animate__fadeIn animate__faster"  width={1} height={'50vh'} sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Typography variant="h5" color="text.secondary" sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                            <Info color="error" sx={{mr:1,width:35,height:35}} /> ¡No has completado ninguna tarea en esta sección!
                    </Typography>
                  </Box>
                }
              </Box>
            </Box>
    </>
  )
}
