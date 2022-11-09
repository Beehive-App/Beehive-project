import { Info } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export const NoSectionsComponent = ({message=""}) => {
  return (
    <>
        <Box>
            <Typography variant='h5' sx={{display:'flex',alignItems:'center'}} color="text.secondary">
                <Info sx={{color:'error !important'}} />
                {message}
            </Typography>
        </Box>
    </>
  )
}
