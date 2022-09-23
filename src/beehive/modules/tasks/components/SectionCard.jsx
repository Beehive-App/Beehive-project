import { AddCircle } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import React from 'react'
import { useRef } from 'react';

export const SectionCard = ({section}) => {
  
  const {title,description,color,tasks=[]} = section;    
  

  /* Filter array uncompleted task to get the next task in section. */
  const tasksUncompleted = tasks.filter(task => !task.taskCompleted);
  tasksUncompleted.sort((a,b)=>{ 
    return a.taskDatetime - b.taskDatetime
  })
  const {taskTitle,taskDescription,taskPriority,taskDatetime} = tasksUncompleted[0]; 
  const optionsDay = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const optionsHourMin = {timezone: 'Europe/Madrid',hour:'numeric',minute:'2-digit'};
  const taskDate = new Date(taskDatetime).toLocaleDateString("es-ES",optionsDay) +' '+ new Date(taskDatetime).toLocaleTimeString("es-ES",optionsHourMin); 


  /* UseRef de la nueva nota: */
  const newSectionRef = useRef(); 

  /* Aquí se crearía una nueva tarea para esa sección */
  const handleNewTask = ()=>{
      console.log('nueva tarea en curso')
    
  }

  return (
    <>
    <Card sx={{ width: 350,height:450,m:2}}>
      <CardActionArea className="scroll-sections" sx={{overflowY:'scroll',height:400 }}>
        <CardContent>
          <Box padding={1}>
            <Typography gutterBottom variant="h5" component="div" fontWeight={800}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <Divider />

            {/* Info de la próxima tarea */}
          <Box padding={1}>
            <Typography gutterBottom variant="h6" component="div">
              Próxima tarea:
            </Typography>
            <Typography fontSize={{md:'1.3rem'}} fontWeight={700}>
              {taskTitle}:
            </Typography>
            <Typography fontSize={{md:'1.1rem'}}>
              {taskDescription}
            </Typography>
            <Typography fontSize={{md:'.9rem'}}>
              Fecha: {taskDate} 
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{maxHeight:50}}>
        {/* Añadir una tarea rápida: */}
        <IconButton ref={newSectionRef} onClick={handleNewTask}>   
          <AddCircle color="primary" sx={{width:'30px',height:'30px'}}  />
        </IconButton>
        <Typography fontSize="16px" 
                    onClick={()=>{newSectionRef.current.click()}}
                    ml={1} 
                    color="text.primary" 
                    sx={{cursor:'pointer',
                    transition:'all .5s ease',
                        '&:hover':{
                          color:'primary.main',
                          transform:'scale(1.08)'
                        }
                    }}>
                      Añadir nueva tarea
        </Typography>
      </CardActions>
    </Card>
    </>
  )
}
