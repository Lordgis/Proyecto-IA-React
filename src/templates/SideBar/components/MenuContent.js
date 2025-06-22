// MenuContent.js
import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FaceIcon from '@mui/icons-material/Face';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
  { text: 'Estudiantes', icon: <PeopleIcon />, path: 'estudiantes' },
  { text: 'Asistencias', icon: <CalendarTodayIcon />, path: 'asistencias' },
  { text: 'Reconocimiento IA', icon: <FaceIcon />, path: 'registro' },
  { text: 'Reportes', icon: <BarChartIcon />, path: '' },
  { text: 'Configuración', icon: <SettingsIcon />, path: '' },
];

export default function MenuContent({ open }) {
  return (
    <List>
      {menuItems.map(({ text, icon, path }) => (
        <ListItemButton
          key={text}
          component={NavLink}
          to={path}
          className={({ isActive }) => (isActive ? 'active' : '')}
          sx={{
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
            '&.active': {
              backgroundColor: '#1976d2',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      ))}
    </List>
  );
}