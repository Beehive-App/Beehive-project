import { useState } from 'react';
import { startLogOut } from '../../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useTemporalDrawer } from '../../Hooks/useTemporalDrawer';
import { AppBar, Toolbar, List, ListItem,ListItemButton, Avatar, Box, Menu, MenuItem, Divider, ListItemIcon, IconButton, Tooltip, Button, Drawer, ListItemText } from '@mui/material';
import { AvatarOnline } from './AvatarOnline';
import { Logout, Settings, Info, HelpOutline } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Minimize as MinimizeIcon, MenuOpen as MenuOpenIcon, Home as HomeIcon, AssignmentTurnedIn as AssignmentTurnedInIcon , Settings as SettingsIcon, CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

export const NavBar = () => {
  const menuItems = [
    { icon: <HomeIcon />, name: 'Home' },
    { icon: <AssignmentTurnedInIcon />, name: 'Tareas' },
    { icon: <CalendarMonthIcon />, name: 'Calendario' },
    { icon: <SettingsIcon />, name: 'Configuración' },
  ];

  const dispatch = useDispatch(); 

  //show user first letter / google photo
  // const {displayName} = useSelector(state => state.auth); 

  const handleLogOut = ()=>{
     dispatch(startLogOut()); 
   }

   /* TEMPORAL DRAWER */
   const {open:openDrawer, toggleDrawer} = useTemporalDrawer(); 

  
  /* MENÚ */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <>
      <AppBar position="static" sx={{width: 1, display:'flex', alignItems:'center'}}>
        <Box sx={{width:1 }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between',width:1,px:4 }}>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon sx={{color:'black'}} />
              </IconButton>
              <img src="/svg/BeehiveLogoBlack-02.svg" width="50px"   />

              {/* Dropdown user menu in avatar. */}
              <Tooltip title="Ajustes de cuenta">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <AvatarOnline />
                </IconButton>
              </Tooltip>
          </Toolbar>
        </Box>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Mi cuenta
        </MenuItem>
        <Divider />
        {/* INFO: User Menu: Info */}
        <MenuItem>
          <ListItemIcon>
            <Info fontSize="small" />
          </ListItemIcon>
          Información
        </MenuItem>
        {/* INFO: User Menu: TUTORIALS */}
        <MenuItem>
        <ListItemIcon>
          <HelpOutline fontSize="small"/> 
        </ListItemIcon>
        Guías de usuario
        </MenuItem>
        {/* INFO: User Menu: Settings */}
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Ajustes
        </MenuItem>
        {/* INFO: User Menu: Logout */}
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Salir de la App
        </MenuItem>
      </Menu>
      <Drawer
            anchor='left'
            open={openDrawer}
            onClose={toggleDrawer(false)}
        >
          <Box sx={{width:1,minHeight:'9vh',backgroundColor:"primary.main"}}>

          </Box>
           <List sx={{height:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',width:1}}>

            {
              menuItems.map(mitem=>{
                return(
                    <ListItem key={parseInt(Math.random()*1000)} className="DrawerItem" disablePadding sx={{ display: 'block',width:1 }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          justifyContent: 'center',
                        }}
                      >
                        {mitem.icon}
                      </ListItemIcon>
                      <ListItemText primary={mitem.name}/>
                    </ListItemButton>
                  </ListItem>
                )
              })
            }
            </List>
        </Drawer>
    </>
  );
};