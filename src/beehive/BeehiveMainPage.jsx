import { BeehiveAppLayout } from './layout/BeehiveAppLayout';
import { CalendarView } from './modules/calendar/CalendarView';
import { MainView } from './views/MainView';
export const BeehiveMainPage = () => {



  return (
    <>
      <BeehiveAppLayout>
        {/* <CalendarView /> */}
        <MainView />  
      </BeehiveAppLayout>
    </>
      
  )
}
