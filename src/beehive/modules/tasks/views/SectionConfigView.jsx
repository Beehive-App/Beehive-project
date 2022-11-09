import { useDispatch, useSelector } from 'react-redux'
import { setActiveSection, setIsConfigSection } from '../../../../store/Tasks/tasksSlice';
import { Button,Box, IconButton, Typography, Divider, TextField, Tooltip, Switch, MenuItem, Select, Dialog, DialogContent, DialogActions } from '@mui/material'
import { ArrowBackIos, ArrowBackIosNew, Cancel, Circle, Delete, DeleteForever, DeleteForeverTwoTone, Edit, FirstPage, Save, Update, Warning } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { CalendarPicker } from '@mui/x-date-pickers';
import { useForm } from '../../../../hooks/useForm';
import { sectionColors } from '../../../../data';
import { startDeletingSection, updateSection } from '../../../../store/Tasks/thunks';
import { useSnackbar } from 'notistack';

const formData = {
    sectionTitle:'',
    sectionDescription:'',
    sectionColor:'',
    sectionFav:false,
}
const userUnlockedColors = sectionColors; 
export const SectionConfigView = () => {

    
    const dispatch = useDispatch(); 
    const {activeSection} = useSelector((state)=>state.tasks);
    const {id,sectionFav:fav,sectionColor:scolor,sectionDescription:description,tasks,sectionTitle:title} = activeSection; 
    // Assign to formData
    formData.sectionTitle = title;
    formData.sectionDescription = description;
    formData.sectionColor = scolor;
    formData.sectionFav = fav; 

    const {
        sectionFav,sectionColor,sectionDescription,sectionTitle,formState,setFormState,onInputChange
    } = useForm(formData);


    const refBack = useRef();

    //Snacks 
    const {enqueueSnackbar} = useSnackbar();

    const handleConfigSection = ()=>{
        dispatch(setIsConfigSection()); 
    }

    //Cambiar el valor del select para que se muestre. 
    const [color,setColor] = useState(scolor); 
    const handleColorChange = (e)=>{
        setColor(e.target.value);
        setFormState({
        ...formState,
        sectionColor:e.target.value,
        });
    }

    //Edición de los campos
    const [disabledTitle,setDisabledTitle] = useState(true);
    const handleDisabledTitle = ()=>{
        setDisabledTitle(!disabledTitle);
    } 
    const [disabledDescription,setDisabledDescription] = useState(true);
    const handleDisabledDescription = ()=>{
        setDisabledDescription(!disabledDescription);
    } 
    const [disabledColor,setDisabledColor] = useState(true);
    const handleDisabledColor = ()=>{
        setDisabledColor(!disabledColor);
    } 

    //Activar como sección favorita.
    const [isSectionFav,setIsSectionFav] = useState(sectionFav);
    const handleSectionFavChange = ()=>{
        setIsSectionFav(!isSectionFav);
        setFormState({
            ...formState,sectionFav:!isSectionFav
        });
    }

    //Realizar cambios de la sección
    const onFormSubmit = async(e)=>{
        e.preventDefault();
        dispatch(setActiveSection({id,sectionTitle,sectionDescription,sectionColor,sectionFav,tasks,isConfiguring:true}));
        const {ok} = await dispatch(updateSection());
        if(!ok) return enqueueSnackbar('Algo ha ido mal al modificar el espacio',{variant:"error"});;

        enqueueSnackbar('¡Espacio modificado correctamente!',{variant:"success"});

    }

    //Abrir Dialog que avisa de la eliminación del espacio
    const [deleteOpen,setDeleteOpen] = useState(false);
    const onDeleteCheck = ()=>{
        setDeleteOpen(!deleteOpen);
    }
    //Eliminar una sección
    const onDeleteSection = async()=>{
        await dispatch(startDeletingSection());
        enqueueSnackbar('El espacio ha sido eliminado definitivamente',{variant:"success"});
    }

  return (
    <>
        <Box className="section-config-container animate__animated animate__fadeIn" 
             sx={{
                height:'calc(100% - 64px)',
                width:1,
                display:'flex',
                flexDirection:'column',
                background:'white',
                alignItems:'center',
                justifyContent:'center',
                background:'#fafafa'
                }}>

            {/* <Divider sx={{mx:2}} /> */}

            {/* SETTINGS */}
            <Box
                sx={{
                    height:'90%',
                    width:'95%',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'flex-start',
                    background:'white',
                    boxShadow:'10px 10px 38px -1px rgba(161,161,161,0.69)',
                    borderRadius:3,
                    p:'2rem 2rem'
                }} 
            >
                <Box sx={{
                    height:'5%',
                    width:1,
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    p:'2rem 2rem'
                }}>
                    <Typography variant="h5" my={1}>
                        Configuración del espacio:
                    </Typography>
                    <Box sx={{
                        width:1/4,
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-end'
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
                </Box>
            

{/*             <Typography variant="subtitle">
                {title}
            </Typography> */}
            <Divider sx={{width:1}}/>
            
            <form className="section-config-form" onSubmit={onFormSubmit}>
                <Box sx={{display:'flex',alignItems:'center', width:1,justifyContent:'space-between' }}>
                    
                    <Typography variant="subtitle" p={3} sx={{width:'10%',display:'flex',alignItems:'center',justifyContent:'flex-start' }}>
                        {/* <Circle color="primary" sx={{mx:1,width:15,height:15}}/> */}
                        Título:
                    </Typography>
                    <TextField
                        disabled={disabledTitle}
                        margin="dense"
                        type="text"
                        variant="standard"
                        name="sectionTitle" 
                        value={sectionTitle}
                        onChange={onInputChange}
                        sx={{width:1/2}}
                        // error={!!sectionTitleValid && formSubmited}
                    />
                    <Tooltip title="Editar">
                        <IconButton sx={{transition:'.3s ease','&:hover':{
                                color:"primary.main"
                            }}}
                            onClick={handleDisabledTitle}
                            >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{display:'flex',alignItems:'center', width:1,justifyContent:'space-between' }}>
                    
                    <Typography variant="subtitle" p={3} sx={{width:'10%',display:'flex',alignItems:'center',justifyContent:'flex-start' }}>
                        {/* <Circle color="primary" sx={{mx:1,width:15,height:15}}/> */}
                        Descripción:
                    </Typography>
                    <TextField
                        disabled={disabledDescription}
                        margin="dense"
                        type="text"
                        variant="standard"
                        name="sectionDescription" 
                        value={sectionDescription}
                        onChange={onInputChange}
                        sx={{width:1/2}}
                        // error={!!sectionTitleValid && formSubmited}
                    />
                    <Tooltip title="Editar">
                        <IconButton sx={{transition:'.3s ease','&:hover':{
                                color:"primary.main"
                            }}}
                            onClick={handleDisabledDescription}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{display:'flex',alignItems:'center', width:1,justifyContent:'space-between' }}>
                    
                    <Typography variant="subtitle" p={3} sx={{width:'10%',display:'flex',alignItems:'center',justifyContent:'flex-start' }}>
                        {/* <Circle color="primary" sx={{mx:1,width:15,height:15}}/> */}
                        Color:
                    </Typography>
                    <Select
                        disabled={disabledColor}
                        labelId="section-color"
                        id="section-color-select"
                        variant='standard'
                        value={color}
                        label="Color"
                        onChange={handleColorChange}  
                        sx={{width:1/2}}
                    >
                    {
                      userUnlockedColors.map(({color,name})=>{
                        return(
                          <MenuItem key={name} value={color} sx={{display:'flex',flexDirection:'row'}}>
                              <Box sx={{background:color,width:25,height:25,borderRadius:999,mr:2}}>
                                &nbsp;
                              </Box>
                              <Typography>
                                {name}
                              </Typography>
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                    <Tooltip title="Editar">
                        <IconButton sx={{transition:'.3s ease','&:hover':{
                                color:"primary.main"
                            }}}
                            onClick={handleDisabledColor}    
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{display:'flex',alignItems:'center', width:1, }}>
                    <Typography variant="subtitle" p={3}>
                        Establecer como espacio favorito:
                    </Typography>
                    <Switch checked={isSectionFav} onChange={handleSectionFavChange}/>
                </Box>
                <Box sx={{width:1,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Button type="submit">
                        <Save sx={{mx:1}} />
                        Guardar cambios
                    </Button>
                    <Button color="error" onClick={onDeleteCheck}>
                        <DeleteForever sx={{mx:1}} />
                        Eliminar Espacio
                    </Button>
                </Box>
            </form>
                            
            <Dialog open={deleteOpen} onClose={onDeleteCheck}>
                <DialogContent sx={{p:5,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <Typography color="error" variant="h4" sx={{alignItems:'center',display:'flex',textDecoration:'underline'}}>
                        <Warning  sx={{width:40,height:40,m:'0 10px 0 0px'}}/>
                        ¡Atención!
                    </Typography>
                    <Typography sx={{textAlign:'center',mt:2}}>
                        Estás a punto de eliminar el espacio para siempre. Se borrarán todos los datos y las tareas asociadas al mismo. Tenga en cuenta que esta acción es irreversible, por lo que una vez borrado será imposible recuperar la información perdida. ¿Desea continuar?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{p:2,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Button onClick={onDeleteCheck}>
                        Cancelar
                    </Button>
                    <Button color="error" onClick={onDeleteSection}>
                        <DeleteForeverTwoTone />
                        Sé lo que hago, borrar espacio
                    </Button>
                </DialogActions>
            </Dialog>
            </Box>
        </Box>

    </>
  )
}
