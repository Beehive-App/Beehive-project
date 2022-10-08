import { Navigate, Route, Routes } from 'react-router-dom'
import { BeehiveMainPage } from '../BeehiveMainPage'
import { TasksPage } from '../modules/tasks/TasksPage'


export const BeehiveRouter = () => {

  return (
    <Routes>
            <Route path="/" element={<BeehiveMainPage />}/>
            <Route path="/tasks" element={<TasksPage />}/>
            {/* <Route path="test" element={<TestPage />}/> */}
            <Route path="/*" element={<Navigate to='/'/>}/>
    </Routes>
  )
}
