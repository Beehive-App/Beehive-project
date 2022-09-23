import { Home as HomeIcon, AssignmentTurnedIn as AssignmentTurnedInIcon , Settings as SettingsIcon, CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

export const menuItems = [
    { icon: <HomeIcon />, title: 'Home',url:'/' },
    { icon: <AssignmentTurnedInIcon />, title: 'Tareas',url:'/tasks' },
    { icon: <CalendarMonthIcon />, title: 'Calendario',url:'/calendar' },
    { icon: <SettingsIcon />, title: 'Configuración',url:'/settings' },
  ];