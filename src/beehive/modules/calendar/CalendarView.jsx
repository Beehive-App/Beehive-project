import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { isSameMonth } from "date-fns";
import { addDays, addMonths, eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, isMonday, isSameDay, startOfMonth, subMonths } from "date-fns/esm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CalendarView = () => {
    
    //Needed funcitons and vars: 
    
    const dispatch = useDispatch(); 
    //Today; 
    const Today = new Date(); 
    
    //Change between months. Starts on Today. 
    const [datetime, setDatetime] = useState(Today.getTime());
    
    //Get the days inside a controlled month
    // const [currentMonth, setCurrentMonth] = useState(Today.getMonth());
    
    //Get all weeks inside this interval
    const MonthStart = startOfMonth(datetime);
    const MonthEnds  = endOfMonth(MonthStart);  
    const AllWeeks = eachWeekOfInterval({start:MonthStart,end:MonthEnds});
    
    //Save the weeks in a Complete Month Array.
    const CompleteMonth = []; 
    
    for (const startWeekDay of AllWeeks) {
        const endWeekDay = endOfWeek(startWeekDay); 
        //Sunday is the start day for js. I have to move sunday to be the last element in the array, thats why I add 1 day to each.  
        const Week = eachDayOfInterval({start:addDays(startWeekDay,1),end:addDays(endWeekDay,1)}); 
        CompleteMonth.push(Week); 
    }
    
    //Styles.
    let classNameValue = 'tinyCalendar-current-month';
    
    //Week Days.
    const weekDayNames = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    //Get Month Name in spanish
    const formatter = new Intl.DateTimeFormat('Es', { month: 'long' });
    const monthName = formatter.format(MonthStart);
    
    
    //Handlers
    
    //Next month: 
    
    const handleNextMonth = ()=>{
        setDatetime(addMonths(datetime,1));
    }
    
    
    const handlePrevMonth = ()=>{
        setDatetime(subMonths(datetime,1));
    }
    
    // //Set active Day to get the tasks. 
    // const onSetActiveDay = (day)=>{
    //     const time = day.getTime(); 
    //     dispatch( setActiveDay(time) ); 
    // }


    
    return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="animate__animated animate__fadeIn animate__faster"
    >

        <Box flexDirection={'row'} alignItems="center" justifyContent={'center'} height={{xs:'calc(100% - 64px)',md:'calc(100% - 64px)',xl:'calc(100% - 64px)'}} sx={{my:5,display:'flex',width:'100%'}}>

            {/* Prev Month */}
            <Box  flexDirection={'column'} alignItems="center" justifyContent={'space-around'} sx={{mt:11,display:'flex',width:'5%',height:'100%'}}>
                <IconButton onClick={handlePrevMonth}>
                    <ArrowBackIos />
                </IconButton>
            </Box>
            
            {/* Calendar */}
            <Box flexDirection={'column'} alignItems="flex-start" justifyContent={'center'} sx={{display:'flex',width:'90%',height:'100%'}}>
                
                <Box flexDirection={'row'} alignItems="center" justifyContent={'flex-start'} sx={{display:'flex',flexDirection:'column',width:1}}>
                    <Typography variant="h4">
                            {monthName.toUpperCase()} {MonthStart.getFullYear()}
                    </Typography>
                    <Divider sx={{width:1}} />
                </Box>
                
                <Box flexDirection={'row'} alignItems="center" justifyContent={'center'} sx={{display:'flex',width:1}}>
                {
                    
                    weekDayNames.map(dayName=>{
                        return (
                            <>
                                <Box height={{xs:'2em',md:'2em',xl:'2em'}} width={{xs:'14.28%',md:'14.28%',xl:'14.28%'}} sx={{py:4,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
                                    <Typography variant="subtitle1">
                                        {dayName}
                                    </Typography>
                                </Box>
                            </>
                        )
                    })
                
                }
                </Box>
                {
                    CompleteMonth.map(Week=>{
                        return(
                            <>  
                                <Box flexDirection={'row'} alignItems="center" justifyContent={'center'} sx={{display:'flex',width:1,border:'2px solid #f1f1f1'}}>                           
                                    {
                                    Week.map(day=>{
                                        return (
                                            <>
                                                <Box onClick={()=>{return;}} height={{xs:'1em',md:'5em',xl:'7em'}} width={{xs:'14.28%',md:'14.28%',xl:'14.28%'}} sx={{borderLeft:!(isMonday(day)) && '2px solid #f1f1f1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around',background:!isSameMonth(day,MonthStart) ? '#f2f2f2' : ''}}>
                                                    <Typography fontSize={'1rem'} sx={{width:1,height:'25%',px:1}} >
                                                        {day.getDate()} 
                                                    </Typography>
                                                    <Box className="calendar-events" sx={{width:1,height:'75%'}}>

                                                    </Box>
                                                </Box>
                                            </>
                                        )
                                    })
                                    }
                                </Box>
                            </>

                        )
                    })
                }
            </Box>

            {/* Next Month  */}
            <Box flexDirection={'column'} alignItems="center" justifyContent={'space-around'} sx={{mt:11,display:'flex',width:'5%',height:'100%'}}>
                <IconButton onClick={handleNextMonth}>

                    <ArrowForwardIos />

                </IconButton>
            </Box>  

            </Box>  
    </Grid>
  )
}
