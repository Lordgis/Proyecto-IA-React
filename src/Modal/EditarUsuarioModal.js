import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const roles = ["estudiante", "docente", "administrador"];
const estados = ["activo", "inactivo", "suspendido"];

const EditarUsuarioModal = ({ abierto, usuario, onClose, onUsuarioActualizado }) => {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    correo: "",
    rol: "",
    estado: "",
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre_completo: usuario.nombre_completo || "",
        correo: usuario.correo || "",
        rol: usuario.rol || "estudiante",
        estado: usuario.estado || "activo",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarCambios = () => {
    if (!usuario?.id) return;

    axios
      .put(`http://localhost:5000/usuario/editar/${usuario.id}`, formData)
      .then(() => {
        onUsuarioActualizado(); // Recarga usuarios
      })
      .catch((error) => {
        alert("Error al actualizar usuario: " + error.response?.data?.detalle || error.message);
      });
  };

  return (
    <Dialog open={abierto} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Nombre completo"
          name="nombre_completo"
          value={formData.nombre_completo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {roles.map((rol) => (
            <MenuItem key={rol} value={rol}>
              {rol}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {estados.map((estado) => (
            <MenuItem key={estado} value={estado}>
              {estado}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleGuardarCambios}>
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarUsuarioModal;
