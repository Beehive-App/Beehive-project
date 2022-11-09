import { Autocomplete, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, FormControl, IconButton, InputLabel, List, ListItem, MenuItem, Select, TextField, ThemeProvider, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRef,useState } from 'react'
import { BeehiveAppLayout } from '../../../layout/BeehiveAppLayout'
import { SectionCard } from '../components/SectionCard'
import { SidebarSection } from '../components/SidebarSection'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useForm } from '../../../../hooks/useForm'
import { startCreatingNewSection } from '../../../../store/Tasks/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { SectionMobile } from '../components/SectionMobile'
import { CastConnectedOutlined, Favorite, FavoriteBorder, HelpOutline, Info, QuestionMark } from '@mui/icons-material'
import { sectionColors } from '../../../../data'
import { unstable_styleFunctionSx } from '@mui/system'
import { NoSectionsComponent } from '../components/NoSectionsComponent'


//data de bd
const userUnlockedColors = sectionColors;

//Form data:

const formData = {
    sectionTitle:'',
    sectionDescription:'',
    sectionColor:'',
    sectionFav:false,
}

//Form Validations

const formValidations = {
  sectionTitle: [(value)=>value.length>=1,'El título es obligatorio.']
}

export const TasksMainView = () => {

  const newSectionRef = useRef(); 
  const dispatch = useDispatch(); 

  const MobileView = useMediaQuery('(max-width:600px)');

  const {userSections} = useSelector(state=>state.tasks); 

  //Form 
  const {sectionTitleValid,sectionFav,sectionTitle, sectionDescription, setFormState, onInputChange, formState} = useForm(formData,formValidations); 
  const [formSubmited, setFormSubmited] = useState(false); 

  //Tooltip : 
  const [openTooltip, setOpenTooltip] = useState(false); 

  const handleTooltipClose = ()=>{ setOpenTooltip(false); }
  const handleTooltipOpen  = ()=>{ setOpenTooltip(true); }

  //Checkbox fav: 
  const [favChecked, setFavChecked] = useState(false)
  const handleFavCheckboxChange = ()=>{
    setFavChecked(!favChecked);
    setFormState({
      ...formState,
      sectionFav:!favChecked
    });
  }

  //Abrir y cerrar el dialogo para añadir una sección.
  const [open, setOpen] = useState(false); 
  const handleDialogState = ()=>{
      setOpen(!open); 
      if(!open){
        setColor(''); 
        setFavChecked(false);
        setFormState({
          sectionTitle:'',sectionDescription:'',sectionColor:'', sectionFav:false
        });
      }
  }

  //responsive dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  //Cambiar el valor del select para que se muestre. 
  const [color,setColor] = useState(''); 
  const handleColorChange = (e)=>{
    setColor(e.target.value);
    setFormState({
      ...formState,
      sectionColor:e.target.value,
    });
  }
  /* Scrolls sections when needed: */
  const [scroll, setScroll] = useState(0);
  const handleSectionScrolling = ()=>{
    const [scrollDiv] = document.getElementsByClassName('scroll-sections');
    scrollDiv.scroll({
      top: scroll,
      behavior: 'smooth'
    })

    //TODO: Mirar porque hay un punto que se bloquea, no se si es casualidad o al llegar a un punto concreto de espacios. (cuando scrollHeight = 778, el máximo que llega es a 777)
    
    if(scrollDiv.offsetHeight + scrollDiv.scrollTop + 100 >= scrollDiv.scrollHeight)
      setScroll(scrollDiv.scrollHeight); 
    else
      setScroll(scroll+100); 
    if (scrollDiv.offsetHeight + scrollDiv.scrollTop >= scrollDiv.scrollHeight) {  
      setScroll(100);
      scrollDiv.scroll({
        top: 0,
        behavior: 'smooth'
      })  
    }
  }
  //snackbar section created.
  const {enqueueSnackbar} = useSnackbar();

  //Submit
  const onNewSection = async()=>{
    setFormSubmited(true); 

    !!sectionTitleValid && enqueueSnackbar(sectionTitleValid,{variant:"error"});
    if (!!sectionTitleValid) return;

    const {ok} = await dispatch( startCreatingNewSection(formState) ) ; 
    setOpen(false); 

    if (!ok) enqueueSnackbar('No se ha podido crear el espacio.',{variant:'error'}); 
    else enqueueSnackbar(`El espacio "${sectionTitle}" se ha creado correctamente`,{variant:'success'});
  }

  return(
    <>
            <Box className="main-tasks-container animate__animated animate__fadeIn" 
            sx={{
                    height:'calc(100% - 64px)',
                    width:1,
                    display:'flex'
                }}>
                  
              {/*INFO: VISTA PC*/}
              {/* DRAWER CON TODAS LAS SECCIONES Y POSIBILIDAD DE CREAR NUEVAS */}
              <Box className="tasks-drawer"
                  display={{xs:'none',md:'flex'}}
                   sx={{
                    flexDirection:'column',
                    height:'100%',
                    width:"300px",
                    background:'white',
                    borderRight:'1px solid #eeeeee',
                   }}
              > 
                {/* Sidebar Title */}
                <Box width={1} minHeight='13%' flexDirection="column" alignItems="center" justifyContent='space-around' padding={{md:2}} background="red" sx={{display:'flex'}}>
                   <Typography textAlign='left'width={1} variant="h5" fontWeight={500} >
                    Tus espacios: 
                   </Typography>
                   <Divider width='100%' />
                </Box>

                {/* Sidebar Items */}
                <Box height={350} className="scroll-sections" sx={{overflowY:"scroll",direction:userSections.lenght  && 'rtl'}}>
                   <List >
                    {/* FOREACH / MAP ARRAY CON LAS SECCIONES */}
                    {
                      (userSections.length > 0)
                      ? userSections.map(sect=>{
                        return <SidebarSection key={sect.id} {...sect} />
                      })
                      : <ListItem sx={{width:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                          <Typography variant='subtitle2' sx={{display:'flex',alignItems:'center',textAlign:'center'}} color="text.secondary">
                            Aquí aparecerán tus espacios creados. ¿Por qué no pruebas a añadir uno?
                          </Typography>
                        </ListItem>
                    }
                   </List>
                </Box>
                <Box sx={{width:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',my:3}}>
                  <IconButton sx={{margin:'0 auto'}} onClick={handleSectionScrolling}>
                      <KeyboardArrowDownIcon />
                  </IconButton>
                </Box>
                <Divider/>
              {/* Add section */}
              <Box width={1} minHeight='13%' flexDirection="row" alignItems="center" justifyContent='center' padding={{md:2}} background="red" sx={{display:'flex'}}>
                    
                   <IconButton ref={newSectionRef} onClick={handleDialogState}>
                    <AddCircleIcon color="primary" />
                   </IconButton>
                    <Typography fontSize="19px" 
                              onClick={()=>{newSectionRef.current.click()}}
                              ml={1} 
                              color="text.primary" 
                              sx={{cursor:'pointer',
                              transition:'all .5s ease',
                                  '&:hover':{
                                    color:'primary.main',
                                    transform:'scale(1.08)'
                                  }
                              }}>Añadir espacio</Typography>
                   
                </Box>
              </Box>
              {/* Secciones fav */}
              <Box className="tasks-content scroll-sections"
                    sx={{
                      height:'100%',
                      width:"calc(100% - 300px)",
                      background:'',
                      padding:5,
                      display:MobileView ? 'none' : 'flex',
                      flexDirection:'row',
                      flexWrap:'wrap',
                      justifyContent:'flex-start',
                      overflowY:'scroll',
                      background:"#FDFDFD"
                      
                    }}
                >
                    {
                      (userSections.length > 0)
                      ? 
                      userSections.map(sect=>{ 
                        return (sect.sectionFav) ? <SectionCard key={sect.id} {...sect} /> : <></>; 
                      })
                      : <Box sx={{width:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                          <Typography variant='subtitle' sx={{display:'flex',alignItems:'center'}} color="text.primary">
                            <Info color="primary" />Información:
                          </Typography>
                          <Typography variant='subtitle2' sx={{display:'flex',alignItems:'center',textAlign:'center'}} color="text.secondary">
                            ¡Todavía no has establecido ningún espacio como favorito!
                          </Typography>
                       </Box>

                    }
              </Box>
              
              {/*INFO: VISTA Móvil: */}
              <Box
                sx={{display:MobileView ? 'flex' : 'none',flexDirection:'column',padding:5,width:1,}}
              >
                  <Typography variant="h5">
                    Tus espacios de tareas: 
                  </Typography>
                  <Divider />

                  <Box height={700} className="scroll-sections" sx={{overflowY:"scroll",direction:'rtl'}}>
                    <List>
                      {/* FOREACH / MAP ARRAY CON LAS SECCIONES */}

                      {
                        userSections.map(sect=>{
                        return sect.sectionFav &&  <SectionMobile key={sect.id} {...sect} />
                      })
                      }

                      {
                        userSections.map(sect=>{
                        return !sect.sectionFav && <SectionMobile key={sect.id} {...sect} />
                      })
                      }
                    </List>
                  </Box>
                  <Box width={1} minHeight={100} flexDirection="row" alignItems="center" justifyContent='center' padding={{md:2}} background="red" sx={{display:'flex'}}>
                   
                   <IconButton ref={newSectionRef} onClick={handleDialogState}>
                    <AddCircleIcon color="primary" />
                   </IconButton>
                    <Typography fontSize="19px" 
                              onClick={()=>{newSectionRef.current.click()}}
                              ml={1} 
                              color="text.primary" 
                              sx={{cursor:'pointer',
                              transition:'all .5s ease',
                                  '&:hover':{
                                    color:'primary.main',
                                    transform:'scale(1.08)'
                                  }
                              }}>Añadir espacio</Typography>
                </Box>
              </Box>
            </Box>

            {/* Dialogo de creación de Secciones nuevas: */}
            <Dialog open={open} onClose={handleDialogState} maxWidth="sm" fullWidth fullScreen={fullScreen}>
              <DialogTitle mt={2} fontSize={'1.7rem'}>Crear nuevo espacio de tareas:</DialogTitle>
              <DialogContent sx={{padding:'3vh'}} >
                <TextField
                  autoFocus
                  margin="dense"
                  label="Título"
                  type="text"
                  fullWidth
                  variant="standard"
                  name="sectionTitle" 
                  value={sectionTitle}
                  onChange={onInputChange}
                  error={!!sectionTitleValid && formSubmited}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Descripción"
                  type="text"
                  fullWidth
                  variant="standard"
                  name="sectionDescription" 
                  value={sectionDescription}
                  onChange={onInputChange}
                />
                <FormControl fullWidth sx={{marginTop:2,padding:'0 !important'}}>
                    <InputLabel id="section-color">Color</InputLabel>
                    <Select
                    labelId="section-color"
                    id="section-color-select"
                    variant='standard'
                    fullWidth
                    value={color}
                    label="Color"
                    onChange={handleColorChange}             
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
                </FormControl>
                <Typography mt={5}>
                  ¿Establecer como espacio favorito?
                  <Tooltip arrow 
                  onClose={handleTooltipClose}
                  open={openTooltip}
                  title="Al establecer un espacio como favorito saldrá por encima de los demás y se añadirá a la sección de favoritos en vista de ordenador.">
                     <IconButton onClick={handleTooltipOpen}>
                      <HelpOutline />
                     </IconButton>
                  </Tooltip>
                </Typography>
                <Checkbox checked={favChecked} onChange={handleFavCheckboxChange} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
              </DialogContent>
              <DialogActions sx={{padding:'3vh 2vh',}}>
                <Button onClick={handleDialogState}>Cancelar</Button>
                <Button variant="contained" onClick={onNewSection} >Crear espacio</Button>
              </DialogActions>
            </Dialog>
    </>
  )
}
