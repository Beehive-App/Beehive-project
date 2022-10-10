import { useDispatch } from 'react-redux';
import React, { useMemo } from 'react'
import { Box, Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { setActiveSection } from '../../../../store/Tasks/tasksSlice';

export const SidebarSection = ({sectionFav,sectionTitle='',sectionDescription,sectionColor="primary.main",id,tasks}) => {

    const dispatch = useDispatch(); 
    
    const newTitle = useMemo(()=>{
        return sectionTitle.length > 25 ? sectionTitle.substring(0, 25)+'...' : sectionTitle;
    },[sectionTitle]); 

    const newDescription = useMemo(()=>{
        return sectionDescription.length > 45 ? sectionDescription.substring(0, 45)+'...' : sectionDescription;
    },[sectionDescription]); 

    const onSetActiveSection = ()=>{
        //TODO: Cambiar tasks al array que traiga desde bd.    
        dispatch(setActiveSection({sectionFav,sectionTitle,sectionDescription,sectionColor,id,tasks}))
    }

    return (
        <ListItem key={id} disablePadding sx={{direction:'ltr'}}>
        <ListItemButton onClick={onSetActiveSection} >
            <Box width="30px" height="30px" sx={{background:sectionColor}} borderRadius='999px' position={'absolute'}></Box>
            <Grid container direction="column" ml={'45px'}>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={newDescription}/>
            </Grid>
        </ListItemButton>
    </ListItem>
    )

}
