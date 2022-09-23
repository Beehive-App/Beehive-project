import { Box, Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'

export const SidebarSection = ({title='',description,color="primary.main",tasks}) => {
    const newTitle = useMemo(()=>{
        return title.length > 25 ? title.substring(0, 25)+'...' : title;
    },[title]); 
    const newDescription = useMemo(()=>{
        return description.length > 25 ? description.substring(0, 45)+'...' : title;
    },[description]); 

    return (
        <ListItem disablePadding sx={{direction:'ltr'}}>
        <ListItemButton >
            <Box width="30px" height="30px" sx={{background:color}} borderRadius='999px' position={'absolute'}></Box>
            <Grid container direction="column" ml={'45px'}>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={newDescription}/>
            </Grid>
        </ListItemButton>
    </ListItem>
    )

}
