import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {Box, List, ListItem, ListItemText, ListItemButton} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Minimize as MinimizeIcon, MenuOpen as MenuOpenIcon, Home as HomeIcon, AssignmentTurnedIn as AssignmentTurnedInIcon , Settings as SettingsIcon, CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';
import { useDrawer } from '../Hooks/useDrawer';

const menuItems = [
  { icon: <HomeIcon />, name: 'Home' },
  { icon: <AssignmentTurnedInIcon />, name: 'Tareas' },
  { icon: <CalendarMonthIcon />, name: 'Calendario' },
  { icon: <SettingsIcon />, name: 'Configuración' },
];

export const AppDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const {Drawer} = useDrawer(); 


  const handleDrawerState = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Drawer variant="permanent" open={open}  >
        <Box alignItems="center" justifyContent="center" sx={{width:1, display:'flex'}}>
          <IconButton onClick={handleDrawerState} sx={{mt:2}}>
            {open ? <MinimizeIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Box>
        <List sx={{height:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', mb:10}}>

            {
              menuItems.map(mitem=>{
                return(
                    <ListItem key={parseInt(Math.random()*1000)} className="DrawerItem" disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {mitem.icon}
                      </ListItemIcon>
                      <ListItemText primary={mitem.name} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                )
              })
            }
        </List>
      </Drawer>
    </Box>
  );
}
