import { useDispatch, useSelector } from 'react-redux'
import { setIsConfigSection } from '../../../../store/Tasks/tasksSlice';
import { Button,Box, IconButton, Typography, Divider } from '@mui/material'
import { ArrowBackIos, ArrowBackIosNew, FirstPage } from '@mui/icons-material';
import { useRef } from 'react';
import { CalendarPicker } from '@mui/x-date-pickers';

export const SectionConfigView = () => {

    const dispatch = useDispatch(); 
    const {activeSection} = useSelector((state)=>state.tasks);
    const {sectionFav,sectionColor,sectionDescription,tasks,sectionTitle} = activeSection; 

    const refBack = useRef();


    const handleConfigSection = ()=>{
        dispatch(setIsConfigSection()); 
    }

  return (
    <>
        <Box className="section-config-container animate__animated animate__fadeIn" 
             sx={{
                height:'calc(100% - 64px)',
                width:1,
                display:'flex',
                flexDirection:'column'
                }}>
            <Box sx={{
                height:'5%',
                width:1,
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                p:'2rem 2rem'
            }}>
                <IconButton onClick={handleConfigSection} ref={refBack}>
                    <FirstPage color="primary" sx={{width:"30px",height:"30px"}}/>
                </IconButton>
                <Typography
                    onClick={()=>{refBack.current.click()}}
                    sx={{transition:'.5s ease','&:hover':{
                        color:'primary.main',cursor:'pointer'
                    }}}
                >
                    Volver Atras
                </Typography>
            </Box>
            <Divider sx={{mx:2}} />

            {/* SETTINGS */}
            <Box
                sx={{
                    height:'95%',
                    width:1,
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'flex-start',
                    p:'2rem 2rem'
                }} 
            >
            <Typography variant="h5">
                Configuración de la sección:
            </Typography>
            <Typography variant="h6">
                {sectionTitle}
            </Typography>
            {/* FORMULARIO DE CONFIGURACIÓN DE SECCIÓN HERE */}
            </Box>
        </Box>





    </>
  )
}
