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

const StyledSelect = styled(Select)(({ theme }) => ({
  height: 48,
  width: 215,
  [`& .${selectClasses.select}`]: {
    display: 'flex',
    alignItems: 'center',
    pl: 1,
  },
}));

// Estilos CSS para las clases de accesibilidad
const styles = `
  body.accessibility-dark {
    background-color: #121212 !important;
    color: #ffffff !important;
  }
  body.accessibility-contrast {
    background-color: #000000 !important;
    color: #ffff00 !important;
  }
  body.accessibility-largeText {
    font-size: 1.3em !important;
  }
  body.accessibility-reduceMotion * {
    animation: none !important;
    transition: none !important;
  }
  body.accessibility-invert {
    filter: invert(1) hue-rotate(180deg) !important;
  }
`;

// Insertar los estilos en el head
const insertStyles = () => {
  if (!document.getElementById('accessibility-styles')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'accessibility-styles';
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
  }
};

export default function SelectContent() {
  const [setting, setSetting] = useState('');

  useEffect(() => {
    insertStyles();

  }, []);

  const applySetting = (value) => {
    setSetting(value);

    // Remover todas las clases relacionadas antes de aplicar una nueva
    document.body.classList.remove(
      'accessibility-dark',
      'accessibility-contrast',
      'accessibility-largeText',
      'accessibility-reduceMotion',
      'accessibility-invert'
    );

    if (value) {
      document.body.classList.add(`accessibility-${value}`);
    }
  };

  const handleChange = (event) => {
    applySetting(event.target.value);
  };

  return (
    <StyledSelect
      value={setting}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Accesibilidad' }}
    >
      <ListSubheader>Accesibilidad de pantalla</ListSubheader>

      <MenuItem value="dark">
        <ListItemIcon><Brightness4Icon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Modo oscuro" />
      </MenuItem>

      <MenuItem value="contrast">
        <ListItemIcon><ContrastIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Alto contraste" />
      </MenuItem>

      <MenuItem value="largeText">
        <ListItemIcon><FormatSizeIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Aumentar fuente" />
      </MenuItem>

      <MenuItem value="reduceMotion">
        <ListItemIcon><RemoveIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Reducir animaciones" />
      </MenuItem>

      <MenuItem value="invert">
        <ListItemIcon><InvertColorsIcon fontSize="small" /></ListItemIcon>
        <ListItemText primary="Invertir colores" />
      </MenuItem>
    </StyledSelect>
  );
}
