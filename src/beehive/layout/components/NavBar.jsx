import { useRef, useState } from 'react';
import { startLogOut } from '../../../store/auth';
import { useDispatch } from 'react-redux';
import { useTemporalDrawer } from '../../Hooks/useTemporalDrawer';
import { AppBar, Toolbar, List, ListItem,ListItemButton, Avatar, Box, Menu, MenuItem, Divider, ListItemIcon, IconButton, Tooltip, Button, Drawer, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { menuItems } from '../../../data';
import { AvatarOnline } from './AvatarOnline';
import { Logout, Settings, Info, HelpOutline, Minimize as MinimizeIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


export const NavBar = () => {

  const dispatch = useDispatch(); 
  const MobileView = useMediaQuery('(max-width:600px)');

  //show user first letter / google photo
  // const {displayName} = useSelector(state => state.auth); 

  const handleLogOut = ()=>{
     dispatch(startLogOut()); 
   }
   /* TEMPORAL DRAWER */
   const {open:openDrawer, toggleDrawer} = useTemporalDrawer(MobileView);
  
  /* MENÚ */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleTest = ()=>{
   
  }

  return (
    <>
      <AppBar position="static" sx={{width: 1, display:'flex', alignItems:'center'}}>
        <Box sx={{width:1 }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between',width:1,px:4,boxShadow:'0px 16px 17px -15px rgba(0,0,0,0.18) !important', }}>
              
              <IconButton onClick={!MobileView ? toggleDrawer(true) : handleTest} sx={{display:MobileView ? 'none' : 'flex'}}>
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

      {/* User menu */}
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

      {/* Drawer in mobile, not necessary. */}
        <Drawer
              anchor='left'
              open={openDrawer}
              onClose={toggleDrawer(false)}
              sx={{display:(MobileView)?'none':'flex'}}
          >
            <Box alignItems="center" justifyContent="center" sx={{display:'flex',width:1,minHeight:'7vh',backgroundColor:"primary.main"}}>
              <img src="/svg/BeehiveText-02.svg" width="110"/>
            </Box>
            <List sx={{height:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',width:1}}>

              {
                menuItems.map(({icon,title,url})=>{
                  const ref = useRef(); 
                  return(
                      <ListItem key={parseInt(Math.random()*1000)} className="DrawerItem" disablePadding sx={{ display: 'block',width:1 }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          px: 2.5,
                        }}
                        onClick={()=>{ref.current.click()}}
                      >
                        <ListItemIcon
                          sx={{
                            justifyContent: 'center',
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <Link ref={ ref } className="Beehive-menu-item" to={`${url}`}>{title}</Link>
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