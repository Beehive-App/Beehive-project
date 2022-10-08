import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { menuItems } from '../../../data'

export const BottomNavigationMobile = () => {
    const [value, setValue] = useState('Home');
    const navigate = useNavigate(); 
    
    let newValue = '';
    
    useEffect(() => {
        newValue = value; 
    }, [value])
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
      navigate(newValue); 
    };


    //TODO: Pensar en como hacer que se 

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
    <BottomNavigation showLabels value={value} onChange={handleChange} sx={{ width:1,height:85 }}>
            {
                menuItems.map(item=>{
                    return (
                        <BottomNavigationAction
                            label={item.title}
                            value={item.url}
                            icon={item.icon}
                        />
                    )
                })
            }
        </BottomNavigation>
    </Paper>
  )
}
