import { AddCircle, Circle, Favorite } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardActions, CardContent, Divider, IconButton, Typography } from '@mui/material';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../../../../store/Tasks/tasksSlice';

export const SectionCard = ({id,sectionTitle,sectionDescription,sectionFav,sectionColor,tasks=[]}) => {
 
  /* Filter array uncompleted task to get the next task in section. */
  const tasksUncompleted = tasks.filter(task => !task.completed);
  tasksUncompleted.sort((a,b)=>{ 
    return a.endDate - b.endDate
  })
  
  const dispatch = useDispatch();

  let 
  description,
  endDate = null;

  if(tasksUncompleted.length) {
    description = tasksUncompleted[0].description;
    endDate     = tasksUncompleted[0].endDate;
  }
  const optionsDay = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const optionsHourMin = {timezone: 'Europe/Madrid',hour:'numeric',minute:'2-digit'};
  const taskDate = endDate !=null ? 'Fecha: ' + new Date(endDate).toLocaleDateString("es-ES",optionsDay) +' '+ new Date(endDate).toLocaleTimeString("es-ES",optionsHourMin) : null; 


  /* UseRef de la nueva nota: */
  const newSectionRef = useRef(); 

  /* Aquí se crearía una nueva tarea para esa sección */
  const handleNewTask = ()=>{
      console.log('nueva tarea en curso')
    
  }

  const onSetActiveSection = ()=>{
    const activeSection = {
      id,sectionColor,sectionDescription,sectionFav,sectionTitle,tasks,isConfiguring:false
    }
    dispatch(setActiveSection(activeSection))
  }

  return (
    <>
    <Card key={id} sx={{ width: 350,height:450,m:2}}>
      <Box sx={{background:sectionColor,height:'10%',display:'flex'}} alignItems={'center'} width={1}>
          <Typography variant="h6" justifyContent={'flex-end'}  alignItems={'center'} sx={{display:'flex',width:1}}>
            <Favorite sx={{color:"#f1f1f1",mr:1}} /> 
          </Typography>
      </Box>
      <CardActionArea onClick={onSetActiveSection} className="scroll-sections" sx={{overflowY:'scroll',height:'90%' }}>
        <CardContent>
          <Box padding={1}>
            <Typography gutterBottom variant="h5" component="div" fontWeight={800}>
              {sectionTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sectionDescription}
            </Typography>
          </Box>
          <Divider />

            {/* Info de la próxima tarea */}
          <Box padding={1}>
            <Typography gutterBottom variant="h6" component="div">
              Próxima tarea:
            </Typography>
            <Typography fontSize={{md:'1.1rem'}} sx={{display:'flex',alignItems:'center'}}>
              {description!=null && <Circle color="primary"sx={{width:'15px',height:'15px',mr:1}} />} {description}
            </Typography>
            <Typography fontSize={{md:'.9rem'}} sx={{color:taskDate==null && 'text.secondary',fontStyle:taskDate == null && 'italic',}}>
              {taskDate!=null ? taskDate : 'No tienes tareas pendientes.'} 
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  )
}
