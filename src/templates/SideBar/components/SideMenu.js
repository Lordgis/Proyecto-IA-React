// src/components/SideMenu.js
import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SelectContent from "./SelectContent";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Avatar,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarTodayIcon,
  Face as FaceIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
  },
}));

const navItems = [
  { text: "Panel", icon: <DashboardIcon />, to: "dashboard" },
  { text: "Estudiantes", icon: <PeopleIcon />, to: "estudiantes" },
  { text: "Asistencias", icon: <CalendarTodayIcon />, to: "asistencias" },
  { text: "Reconocimiento IA", icon: <FaceIcon />, to: "registro" },
  { text: "Reportes", icon: <BarChartIcon />, to: "reportes" },
  { text: "Configuración", icon: <SettingsIcon />, to: "" },
];

function MenuContent() {
  return (
    <List sx={{ flex: 1 }}>
      {navItems.map(({ text, icon, to }) => (
        <ListItemButton
          key={to}
          component={NavLink}
          to={to}
          sx={({ isActive }) =>
            isActive
              ? {
                backgroundColor: "#1976d2",
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              }
              : undefined
          }
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default function SideMenu() {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Drawer variant="permanent">
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Espacio para avatar o usuario si lo deseas */}
      </Stack>

      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
    </Drawer>
  );
}
