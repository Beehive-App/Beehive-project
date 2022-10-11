import React from 'react'
import { useSelector } from 'react-redux';
import { BeehiveAppLayout } from '../../layout/BeehiveAppLayout';
import { SectionConfigView } from './views/SectionConfigView';
import { TaskSectionView } from './views/TaskSectionView';
import { TasksMainView } from './views/TasksMainView';

export const TasksPage = () => {
  
    const {activeSection} = useSelector(state=>state.tasks); 
  
  return (
    <BeehiveAppLayout>
        {
            (activeSection != null && !activeSection.isConfiguring) && <TaskSectionView />
        }
        {
            (activeSection != null && activeSection.isConfiguring) && <SectionConfigView />
        }
        {
            (activeSection == null) && <TasksMainView />   
        }
    </BeehiveAppLayout>
  )
}
