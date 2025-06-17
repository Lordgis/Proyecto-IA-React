import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { selectClasses } from '@mui/material/Select';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ContrastIcon from '@mui/icons-material/Contrast';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import RemoveIcon from '@mui/icons-material/Remove';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import RestoreIcon from '@mui/icons-material/Restore';

const StyledSelect = styled(Select)(({ theme }) => ({
  height: 40,
  width: 240,
  backgroundColor: '#fff',
  borderRadius: 6,
  [`& .${selectClasses.select}`]: {
    display: 'flex',
    alignItems: 'center',
    pl: 1,
  },
}));

const styles = `
  body.accessibility-dark,
  body.accessibility-dark .MuiPaper-root,
  body.accessibility-dark .MuiBox-root,
  body.accessibility-dark .MuiDrawer-paper,
  body.accessibility-dark .MuiAppBar-root,
  body.accessibility-dark .MuiToolbar-root {
    filter: invert(1) hue-rotate(180deg) !important;
    color: #ffffff !important;
  }

  body.accessibility-dark .MuiListItem-root {
    background-color: #1e1e1e !important;
  }

  body.accessibility-contrast,
  body.accessibility-contrast .MuiPaper-root,
  body.accessibility-contrast .MuiBox-root,
  body.accessibility-contrast .MuiDrawer-paper {
    background-color: #000 !important;
    color: #ff0 !important;
  }

  body.accessibility-largeText p,
  body.accessibility-largeText span,
  body.accessibility-largeText button,
  body.accessibility-largeText label,
  body.accessibility-largeText h1,
  body.accessibility-largeText h2,
  body.accessibility-largeText h3,
  body.accessibility-largeText h4,
  body.accessibility-largeText h5,
  body.accessibility-largeText h6,
  body.accessibility-largeText input,
  body.accessibility-largeText a,
  body.accessibility-largeText li {
    font-size: 1.2rem !important;
  }

  body.accessibility-reduceMotion * {
    animation: none !important;
    transition: none !important;
  }

  body.accessibility-invert {
    filter: invert(1) hue-rotate(180deg) !important;
  }
`;

const insertStyles = () => {
  if (!document.getElementById('accessibility-styles')) {
    const style = document.createElement('style');
    style.id = 'accessibility-styles';
    style.innerHTML = styles;
    document.head.appendChild(style);
  }
};

export default function SelectContent() {
  const [setting, setSetting] = useState('');

  useEffect(() => {
    insertStyles();
    // Al montar el componente, cargar setting guardado
    const savedSetting = localStorage.getItem('accessibilitySetting') || '';
    if (savedSetting) {
      applySetting(savedSetting);
    }
  }, []);

  const applySetting = (value) => {
    setSetting(value);
    document.body.classList.remove(
      'accessibility-dark',
      'accessibility-contrast',
      'accessibility-largeText',
      'accessibility-reduceMotion',
      'accessibility-invert'
    );
    if (value) {
      document.body.classList.add(`accessibility-${value}`);
      localStorage.setItem('accessibilitySetting', value);
    } else {
      localStorage.removeItem('accessibilitySetting');
    }
  };

  const handleChange = (event) => {
    applySetting(event.target.value);
  };

  const handleReset = () => {
    applySetting('');
  };

  return (
    <StyledSelect
      value={setting}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Accesibilidad' }}
    >
      <ListSubheader>Opciones de Accesibilidad</ListSubheader>

      <MenuItem value="dark">
        <ListItemIcon><Brightness4Icon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Modo Oscuro" />
      </MenuItem>

      <MenuItem value="contrast">
        <ListItemIcon><ContrastIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Alto Contraste" />
      </MenuItem>

      <MenuItem value="largeText">
        <ListItemIcon><FormatSizeIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Aumentar Texto" />
      </MenuItem>

      <MenuItem value="reduceMotion">
        <ListItemIcon><RemoveIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Reducir Animaciones" />
      </MenuItem>

      <MenuItem value="invert">
        <ListItemIcon><InvertColorsIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Invertir Colores" />
      </MenuItem>

      <MenuItem value="" onClick={handleReset}>
        <ListItemIcon><RestoreIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Restablecer" />
      </MenuItem>
    </StyledSelect>
  );
}
