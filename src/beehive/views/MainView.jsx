import { Box,Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { mainAppTheme } from '../../theme';
import { hexToRgb } from '../../helpers/hexToRGB';


export const MainView = () => {

    const {displayName} = useSelector(state=>state.auth);

    const bgColor = hexToRgb(mainAppTheme.palette.primary.main);
    
    
  return (
    <>
    <Box
      className="animate__animated animate__fadeIn animate__faster mainPage"
      sx={{display:'flex',flexDirection:'column',height:'calc(100% - 64px)',width:1,alignItems:'center',justifyContent:'center'}}
    >
      <Box sx={{display:'flex',flexDirection:'column',height:'95%',width:'95%',alignItems:'center',justifyContent:'center',background:'white'}}>
        {/* <img src={'svg/BeehiveLogoHoneyCircle-02.svg'} width={'155px'} height={'155px'}/> */}
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 248.9 191.1" width="100px" height="100px">
            <g>
              <g>
                <path class="st2" d="M247.1,48.6l-40.8-16.7l-0.1-0.2c-0.1-0.1-0.2-0.1-0.3,0l-59,51.6l4,5.2c0.1,0.1,0.1,0.1,0.2,0.2l0,0l0,0l0,0
                  l37.6,23.2l4.6,19.8c0.9,4,4.7,6.4,8.4,5.4l-6.6-28.4c-0.2-0.9-0.7-1.7-1.4-2.1l0,0c-0.1-0.1-0.1-0.1-0.2-0.2
                  c-0.1-0.1-0.2-0.2-0.3-0.2l-25.6-15.8l61.1,5.4c0.8,0.1,1.5-0.4,1.9-1.1c0.1-0.2,0.2-0.3,0.2-0.4l16.1-37.3c0.1-0.2,0.1-0.4,0-0.6
                  l0.3,0.2l1.5-4.2C249.1,50.7,248.4,49.1,247.1,48.6z M203.7,43.1L222,87.8l-63.1-5.6L203.7,43.1z M240.7,53.8l-12.9,29.8
                  l-17.3-42.2L240.7,53.8L240.7,53.8z"/>
              </g>
              <g>
                <path class="st2" d="M97.7,89C97.7,89,97.7,89,97.7,89L97.7,89L97.7,89c0.1-0.1,0.2-0.1,0.2-0.2l4-5.2L42.8,32h-0.1l-0.1-0.2
                  l-41,16.8c-1.3,0.5-2,2.1-1.5,3.5l1.5,4.2L2,56.2c-0.1,0.2-0.2,0.4,0,0.6l16.1,37.3c0,0.1,0.1,0.1,0.1,0.2
                  c0.2,1.1,1.1,1.8,2.1,1.7l61.1-5.4l-25.6,15.8c-0.2,0.1-0.2,0.2-0.3,0.2c-0.1,0.1-0.1,0.1-0.2,0.2l0,0c-0.7,0.5-1.2,1.2-1.4,2.1
                  l-6.8,28.6c3.7,1,7.5-1.4,8.4-5.4l4.6-19.8L97.7,89z M89.7,82.5l-63.1,5.6l18.4-44.8L89.7,82.5z M8,53.8l30.1-12.4L20.8,83.6
                  L8,53.8L8,53.8z"/>
              </g>
              <g>
                <path class="st2" d="M165.2,111.4l-19.5-27.1c-3.5,2.8-4.1,7.9-1.5,11.6l11.4,15.9c-0.8,0-1.7,0.1-2.6,0.4l-29.5,10.1l-28.7-9.8
                  c-0.6-0.2-1.2-0.3-1.8-0.4l11.7-16.2c2.6-3.6,1.9-8.8-1.5-11.6l-19.6,27.2c-2.2,3-2.1,7.1-0.1,9.9c0,0.1,0.1,0.2,0.1,0.2
                  l36.8,67.3c0.8,1.5,2.4,2.3,4,2.2c1.5,0.2,3.1-0.7,4-2.2l37.3-68.3c0.2-0.3,0.2-0.5,0.3-0.8C167.3,117.2,167,113.9,165.2,111.4z
                  M115.9,128.3c3.1,1.1,6.2,0,8.2-2.4c2,2.2,5.1,3.1,8,2.1l25.3-8.6l-12.8,23.3l-20.2,6.5l-20-6.4l-12.4-22.6L115.9,128.3z
                  M124.5,179.5l-15-27.4l7.2,2.3c3.1,1,6.4-0.2,8.1-2.8c1.8,2.4,4.8,3.6,7.8,2.6l6.9-2.2L124.5,179.5z"/>
              </g>
              <g>
                <path class="st2" d="M83.4,8.2l22-3.2l9.9,14.2c-2.2,1.3-4.2,3.8-5.5,5.8c-0.4,0.8-0.7,1.5-0.9,2.2c-0.3,0.8-0.5,1.5-0.8,2.2
                  c-0.1,0.6,0,1.2,0.2,1.7l0,0l-1.9,0.6c-2.4,0.2-4.5,2-5.4,4.7l-7.2,24l0,0c-0.5,1.7-0.2,3.6,0.8,5.1l26.8,37.3
                  c0.8,1.1,1.9,1.5,3.1,1.2c0.8,0.2,1.8-0.2,2.4-0.9l27.4-38.1c1.4-1.9,1.5-4.3,0.4-6.3l-6-21.8c-0.6-2.2-2-3.8-3.7-4.5v-0.1
                  l-5.1-1.7c0.2-0.5,0.2-1,0.1-1.5c-0.2-0.7-0.5-1.4-0.8-2.2c-0.3-0.8-0.6-1.5-0.9-2.2c-1.3-2.1-3.3-4.5-5.5-5.8l9.9-14.2l22,3.2
                  V7.9c0.2-2.5-1.2-4.7-3.4-5l-17.4-2.5c-1.5-0.5-3.1,0-4.1,1.4l-11.6,16.6l0.1,0.1c-0.2,0.1-0.4,0.2-0.5,0.2
                  c-1.9,1.1-1.7,4.2-2,6.5c-0.1,0.6-0.2,1.3-0.2,2c0,1.4,0.2,2.7,0.6,3.9c0.2,0.8,0.6,1.7,1.2,2.3c0.9,1.4,2.1,2.5,3.5,2.9
                  c0.3,0.1,0.6,0.2,0.9,0.2l10.4,3.3l5.6,20.5l-23.6,32.7l-23-32l6.5-21.8l8.7-2.8c0.3-0.1,0.5-0.2,0.8-0.2c0.6-0.2,1.2-0.6,1.8-1
                  c1.8-1.3,3-3.5,3.2-5.8c0.2-0.8,0.2-1.6,0.2-2.4c0-0.7-0.1-1.3-0.2-2c-0.3-2.2-0.1-5.3-2-6.5c-0.2-0.1-0.4-0.2-0.5-0.2l0.1-0.1
                  L108.2,1.7c-1-1.5-2.7-2-4.1-1.4L86.7,2.7c-2.2,0.3-3.6,2.5-3.4,5L83.4,8.2z"/>
              </g>
            </g>
        </svg>
        <Box sx={{display:'flex',flexDirection:'column',height:'40%',width:1,alignItems:'center',justifyContent:'center'}}>
          <Typography variant="h2" fontWeight={'bold'}>
              Bienvenido de vuelta a Beehive
          </Typography>
          <Typography variant="h4">
              {displayName}
          </Typography>
        </Box>
      </Box>
      
    </Box>
    </>
  )
}