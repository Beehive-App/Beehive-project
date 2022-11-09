import { Favorite, Star } from '@mui/icons-material';
import { Box, Grid, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../../../../store/Tasks/tasksSlice';

export const SectionMobile = (section) => {

  const {id,sectionTitle,sectionDescription,sectionColor,sectionFav,tasks} = section; 
  
  const dispatch = useDispatch(); 
    
  const newTitle = useMemo(()=>{
      return sectionTitle.length > 40 ? sectionTitle.substring(0, 40)+'...' : sectionTitle;
  },[sectionTitle]); 

  const newDescription = useMemo(()=>{
      return sectionDescription.length > 40 ? sectionDescription.substring(0, 40)+'...' : sectionDescription;
  },[sectionDescription]); 


  const onSetActiveSection = ()=>{
      //TODO: Cambiar tasks al array que traiga desde bd.
      
      dispatch(setActiveSection({sectionFav,sectionTitle,sectionDescription,sectionColor,id,tasks,isConfiguring:false}))
  
  }

  return (
    <>
        <ListItem key={id} disablePadding sx={{direction:'ltr'}}>
            <ListItemButton onClick={onSetActiveSection} >
                <Box width="30px" height="30px" sx={{background:sectionColor}} borderRadius='999px' position={'absolute'}></Box>
                <Grid container direction="column" ml={'45px'}>
                    <ListItemText primary={newTitle}/>
                    <ListItemText secondary={newDescription}/>
                </Grid>
                {
                    sectionFav && <Favorite color="primary" />
                }
                
            </ListItemButton>
        </ListItem>
    </>
  )
}
