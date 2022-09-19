import { CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'

export const CheckingAuth = () => {
  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight:'100vh',padding:4,width:1}}
       >
            <Grid item
                sx={{ display:'flex', justifyContent:"center", padding:3,borderRadius:2, width:{md:1}}}
            > 
                <CircularProgress color="error"/> 
            </Grid>
        
        </Grid>
  )
}
