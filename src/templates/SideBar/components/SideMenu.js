// src/components/SideMenu.js
import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { NavLink } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FaceIcon from '@mui/icons-material/Face';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import WarningIcon from '@mui/icons-material/Warning'; // Para alertas

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

const activeStyle = {
  backgroundColor: '#1976d2',
  color: 'white',
  '& .MuiListItemIcon-root': {
    color: 'white',
  },
};

function MenuContent() {
  return (
    <List sx={{ flex: 1 }}>
      <ListItemButton component={NavLink} to="/dashboard" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Panel" />
      </ListItemButton>

      <ListItemButton component={NavLink} to="/usuarios" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Estudiantes" />
      </ListItemButton>

      <ListItemButton component={NavLink} to="/asistencias" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
        <ListItemText primary="Asistencias" />
      </ListItemButton>


      <ListItemButton component={NavLink} to="/reconocimiento" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <ListItemIcon><FaceIcon /></ListItemIcon>
        <ListItemText primary="Reconocimiento IA" />
      </ListItemButton>

      <ListItemButton component={NavLink} to="/reportes" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <ListItemIcon><BarChartIcon /></ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItemButton>

      <ListItemButton component={NavLink} to="/configuracion" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Configuración" />
      </ListItemButton>
    </List>
  );
}

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
      </Stack>
    </Drawer>
  );
}
