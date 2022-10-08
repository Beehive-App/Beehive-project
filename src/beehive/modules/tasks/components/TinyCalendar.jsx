import { useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { isSameMonth,eachWeekOfInterval,eachDayOfInterval, endOfMonth, startOfMonth, endOfWeek, isThisMonth, setDate, addMonths, subMonths, isToday, addDays, isSameDay } from "date-fns/esm";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDay } from "../../../../store/Tasks/tasksSlice";


/*
    TINY CALENDAR COMPONENT: 
    Author: Aarón Escribano
    App: BeehiveApp
    All Rights Reserved
*/

export const TinyCalendar = () => {

//Needed funcitons and vars: 

const dispatch = useDispatch(); 
const {activeDay} = useSelector(state=>state.tasks);
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
const weekDayNames = ['L','M','X','J','V','S','D'];
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

//Set active Day to get the tasks. 
const onSetActiveDay = (day)=>{
    const time = day.getTime(); 
    dispatch( setActiveDay(time) ); 
}

return (

    <Box flexDirection={'row'} alignItems="center" justifyContent={'center'} sx={{mt:5,display:'flex',width:1,height:'33vh'}}>

        {/* Prev Month */}
        <Box  flexDirection={'column'} alignItems="center" justifyContent={'space-around'} sx={{mt:11,display:'flex',width:'10%',height:'100%'}}>
            <IconButton onClick={handlePrevMonth}>
                <ArrowBackIos />
            </IconButton>
        </Box>

        {/* Calendar */}
        <Box flexDirection={'column'} alignItems="center" justifyContent={'space-around'} sx={{display:'flex',width:'80%',height:'100%'}}>
            
            <Box flexDirection={'row'} alignItems="center" justifyContent={'space-around'} sx={{display:'flex',width:1}}>
            <Typography variant="h5">
                    {monthName.toUpperCase()} {MonthStart.getFullYear()}
            </Typography>
            </Box>
            
            <Box flexDirection={'row'} alignItems="center" justifyContent={'space-around'} sx={{display:'flex',width:1}}>
            {
                
                weekDayNames.map(dayName=>{
                    return (
                        <>
                            <Box className={'tinyCalendar-dayWeekNames'} sx={{width:'35px',height:'35px',textAlign:'center'}}>
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
                            <Box flexDirection={'row'} alignItems="center" justifyContent={'space-around'} sx={{display:'flex',width:1}}>                           
                                {
                                Week.map(day=>{
                                                        
                                    if(!isSameMonth(day,MonthStart)) classNameValue = 'tinyCalendar-other-month';
                                    else classNameValue = 'tinyCalendar-current-month';
                                    if(isSameDay(day,activeDay)) classNameValue += ' tinyCalendar-active-day'
                                    return (
                                        <>
                                            <Box className={classNameValue}  onClick={isSameMonth(day,MonthStart) ? ()=>onSetActiveDay(day) : ()=>{return;}  } sx={{width:'35px',height:'35px',textAlign:'center'}}>
                                                <Typography fontSize={'1.2rem'} >
                                                    {day.getDate()}
                                                </Typography>
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
        <Box flexDirection={'column'} alignItems="center" justifyContent={'space-around'} sx={{mt:11,display:'flex',width:'10%',height:'100%'}}>
            <IconButton onClick={handleNextMonth}>

                <ArrowForwardIos />

            </IconButton>
        </Box>  

    </Box>
  )
}
