import { Box } from '@mui/material'
import React from 'react'
import { BeehiveAppLayout } from '../../../layout/BeehiveAppLayout'

export const TaskSectionView = () => {
  return (
    <>
    <BeehiveAppLayout>
        <Box className="main-tasks-container" 
        sx={{
                height:'calc(100% - 64px)',
                width:1,
                display:'flex'
                }}>
          <Box className="tasks-drawer"
               sx={{
                height:'100%',
                width:"300px",
                background:''
               }}
          >

          </Box>
          <Box className="tasks-content"
                sx={{
                  height:'100%',
                  width:"calc(100% - 300px)",
                  background:''
                }}
            >

          </Box>
        </Box>


    </BeehiveAppLayout>
</>
  )
}
