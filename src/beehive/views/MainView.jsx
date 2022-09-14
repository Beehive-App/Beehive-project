import { Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FavCard } from '../components/FavCard';
import { StarOutline } from '@mui/icons-material';

export const MainView = () => {

    const user = {
        name: 'Lucía',
        surname:'Márquez Martínez',
        s:'F', 
        favSections:[1,3,2]
    }

    const sections = [{
      sid:'1',
      title: 'Section 1',
      subtitle: 'Subtitle 1',
      icon:<StarOutline />,
      path:'/home',
    },{
      sid:'2',
      title: 'Section 2',
      subtitle: 'Subtitle 2',
      icon:<StarOutline />,
      path:'/home',
    },
    {
      sid:'3',
      title: 'Section 3',
      subtitle: 'Subtitle 3',
      icon:<StarOutline />,
      path:'/home',
    },
    {
      sid:'4',
      title: 'Section 3',
      subtitle: 'Subtitle 3',
      icon:<StarOutline />,
      path:'/home',
    },
    {
      sid:'5',
      title: 'Section 3',
      subtitle: 'Subtitle 3',
      icon:<StarOutline />,
      path:'/home',
    },
    {
      sid:'6',
      title: 'Section 3',
      subtitle: 'Subtitle 3',
      icon:<StarOutline />,
      path:'/home',
    },
    {
      sid:'7',
      title: 'Section 3',
      subtitle: 'Subtitle 3',
      icon:<StarOutline />,
      path:'/home',
    },
    {
      sid:'8',
      title: 'Section 8',
      subtitle: 'Subtitle 8',
      icon:<StarOutline />,
      path:'/home',
    }]
 
  return (
    <>
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      sx={{ minHeight: '93vh', backgroundColor: '', borderRadius: 0, px:10,py:5 }}
    >
        <Grid item>
            <Typography variant="h3" sx={{ color: 'text.main', fontWeight: 'light' }}> {`Bienvenid${user.s=='F'? 'a' : (user.s=='M' ? 'o' : '@')} ${user.name}`}</Typography>   
        </Grid>
        <Divider sx={{width:'90%'}}/>
        
        <Grid item sx={{mt:5}}>
          <Typography variant="h6"> Tus Favoritos: </Typography>
          <Grid container sx={{display:'flex', flexWrap:'wrap', flexDirection:"row", width:1}}>
            {user.favSections.map(sectId =>{
            const sectionFound = sections.find( sect => sect.sid == sectId );
              return (
                <FavCard key={sectionFound.sid} section={sectionFound} />
              )
            })}
          </Grid>
            

         

        </Grid>

        {/* <Grid item xs={ 12 }>
            <StarOutline sx={{ fontSize: 100, color: 'primary.main' }} />
        </Grid>
        <Grid item xs={ 12 }>
            <Typography color="primary.main" variant='h5'>Selecciona o crea una entrada</Typography>
        </Grid> */}
    </Grid>

    </>
  )
}
