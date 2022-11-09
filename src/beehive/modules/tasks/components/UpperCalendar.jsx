import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { nextSunday, previousMonday } from 'date-fns';
import { eachDayOfInterval, endOfWeek, nextMonday, startOfWeek } from 'date-fns/esm';
import React, { useState } from 'react'

export const UpperCalendar = () => {
  

  const days = [{index:1,name:'Lunes',abbreviation:'L'},{index:2,name:'Martes',abbreviation:'M'},{index:3,name:'Miercoles',abbreviation:'X'},{index:4,name:'Jueves',abbreviation:'J'},{index:5,name:'Viernes',abbreviation:'V'},{index:6,name:'Sábado',abbreviation:'S'},{index:0,name:'Domingo',abbreviation:'D'}]

  const Today = new Date(); 

  const WeekStart = startOfWeek(Today, { weekStartsOn: 1 })
  const WeekEnd = endOfWeek(Today, { weekStartsOn: 1 })

  const WeekDaysArray = eachDayOfInterval({start:WeekStart,end:WeekEnd})


  const [{actualWeek}, setActualWeek] = useState({actualWeek:WeekDaysArray})


  //Cuando no se use MUI para poder reutilizar el componente
  const theme = useTheme(); 

  const primaryColor = theme.palette.primary.main; 
  const textColor = theme.palette.text.terciary; 
  const isActive = false; 


  const handleNextWeek = ()=>{
    const actualMonday =  actualWeek[0]; 
    const nextWeekMonday   = nextMonday(actualMonday); 
    const nextWeekSunday   = nextSunday(nextWeekMonday); 
    const nextWeek = eachDayOfInterval({start:nextWeekMonday,end:nextWeekSunday})
    setActualWeek({actualWeek:nextWeek});
  }
  const handlePreviousWeek = ()=>{
    const actualMonday =  actualWeek[0]; 
    const prevWeekMonday   = previousMonday(actualMonday); 
    const prevWeekSunday   = nextSunday(prevWeekMonday); 

    const prevWeek = eachDayOfInterval({start:prevWeekMonday,end:prevWeekSunday})
    setActualWeek({actualWeek:prevWeek});
  }

  return (
    <>  
    <div className="UpperCalendar" style={{borderBottom:`solid ${primaryColor} 3px`}}>
      <div className='UpperCalendar-Month-Year'>
          <p>{{/* TODO: PUT MONTH AND YEAR. IF WEEK HAVE 2 MONTH IN THE ARRAY MAKE A STRING LIKE AUG-SEPT 2022 */}}</p>
      </div>
      <div className='UpperCalendar-Week'>
        <div className='UpperCalendar-arrows' onClick={handlePreviousWeek}>
            <img src="../../../public/svg/arrow-back.svg" alt="" width='25px' height='25px' />
            <p>Semana Anterior</p>
          </div>
          {
            actualWeek.map(weekDay => {
              const isToday = (Today.getDay() == weekDay.getDay()); 
              return(
                <>
                <div className={`Upper-Calendar-Day ${isToday ? 'Upper-Calendar-Day-active' : ''}`} >

                  <p key={weekDay.getDay()} className='Upper-Calendar-Day-Number' style={{background:isToday ? primaryColor : '', color:isToday ? textColor : ''}}>
                    {weekDay.getDate()}
                  </p>
                  <p>
                  {
                    (isToday) ? days.find(day => day.index === weekDay.getDay()).name : days.find(day => day.index === weekDay.getDay()).name           
                  }
                  </p>
                </div>
                </>
              )
            })
          }
          <div className='UpperCalendar-arrows' onClick={handleNextWeek}>
            <img src="../../../public/svg/arrow-forward.svg" alt="" width='25px' height='25px'/>
            <p>Semana siguiente</p>
          </div>
      </div>

    </div>
    </>
  )
}
