import { Box, Card, CardActionArea, CardContent ,Grid, Typography } from '@mui/material'
import { StarOutline } from '@mui/icons-material';


export const FavCard = ({section = {}}) => {
    console.log({section}); 
  return (
    <Grid key={section.sid} item sx={{mx:3,my:3}}>
        <Card>
            <Box display="flex" flexDirection="row" justifyContent="flex-end" backgroundColor="primary.main" alignItems="center" sx={{p:1}}>
                <StarOutline sx={{color:'white', fontSize:25}}/>
            </Box>
            <CardActionArea sx={{width:300, height:200}} >
                <CardContent>
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{width:1}}>

                            
                        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" sx={{width:1}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {section.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {section.subtitle}
                        </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
  )
}
