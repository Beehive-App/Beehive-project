import { AppBar, Toolbar, Container, Typography, useTheme, Avatar, Box } from '@mui/material';
import { sizing } from '@mui/system';
import CastleIcon from '@mui/icons-material/Castle';


export const NavBar = () => {

  const theme = useTheme(); 

  return (
    <>
      <AppBar position="static" sx={{width: 'calc(100% - 56px)', ml:'56px', display:'flex', alignItems:'center'}}>
        <Box sx={{width:1 }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between',width:1,px:7 }}>
            <Box display="flex" alignItems="center" justifyContent="space-around" width={180} >
              <CastleIcon sx={{fontSize:30}}/>
              <Typography variant="h6" fontWeight={'bold'}>My New App</Typography>
            </Box>
            <Avatar className="Avatar-header-nophoto" sx={{ color:'black' }} src="https://unsplash.com/es/fotos/NdaIWUUspLc">L</Avatar>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
};