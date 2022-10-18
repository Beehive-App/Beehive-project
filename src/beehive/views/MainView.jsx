import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { FavCard } from '../components/FavCard';
import { StarOutline } from '@mui/icons-material';
import { CalendarView } from '../modules/calendar/CalendarView';
import { mainAppTheme } from '../../theme';

export const MainView = () => {


    const {displayName} = useSelector(state=>state.auth);

    // const bgColor = hexToRgb(mainAppTheme.palette.primary.main);
    
    // fill="rgb(${bgColor.r},${bgColor.g},${bgColor.b})

  return (
    <>

    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="animate__animated animate__fadeIn animate__faster mainPage"
    >
        <Typography variant='h4'>
          {displayName}
        </Typography>

    </Grid>
    </>
  )
}