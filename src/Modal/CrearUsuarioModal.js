import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import Webcam from "react-webcam";
import axios from "axios";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const CrearUsuarioModal = ({ abierto, onClose, onUsuarioCreado }) => {
  const webcamRef = useRef(null);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [camaraDisponible, setCamaraDisponible] = useState(true);
  const [camaraActiva, setCamaraActiva] = useState(false); // Nuevo estado
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Cuando el modal se abre, activamos la cámara
  useEffect(() => {
    if (abierto) {
      setCamaraActiva(true);
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => setCamaraDisponible(true))
        .catch(() => setCamaraDisponible(false));
    } else {
      // Al cerrar el modal, desactivamos la cámara (desmontar webcam)
      setCamaraActiva(false);
      setError(null);
      setNombre("");
      setCorreo("");
      setCamaraDisponible(true);
    }
  }, [abierto]);

  const capturarFoto = () => {
    if (!webcamRef.current) return null;
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };

  const manejarCrearUsuario = async () => {
    setError(null);

    if (!nombre.trim() || !correo.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (!webcamRef.current) {
      setError("La cámara no está disponible.");
      return;
    }

    const fotoDataUrl = capturarFoto();
    if (!fotoDataUrl) {
      setError("No se pudo capturar la foto. Intenta de nuevo.");
      return;
    }

    try {
      setCargando(true);
      const blob = await fetch(fotoDataUrl).then((res) => res.blob());

      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("correo", correo);
      formData.append("imagen", blob, "foto_usuario.jpg");

      const response = await axios.post(
        "http://localhost:5000/api/usuarios/crear",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        onUsuarioCreado();
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Error al registrar usuario, intenta de nuevo."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal open={abierto} onClose={onClose}>
      <Box sx={styleModal}>
        <Typography variant="h6" mb={2}>
          Crear nuevo usuario
        </Typography>

        <TextField
          label="Nombre completo"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Correo electrónico"
          type="email"
          fullWidth
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          margin="normal"
        />

        {/* Solo mostrar Webcam si está activo */}
        {camaraActiva && camaraDisponible ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            style={{ width: "100%", marginTop: 16, borderRadius: 8 }}
          />
        ) : camaraActiva && !camaraDisponible ? (
          <Typography color="error" mt={2}>
            Cámara no disponible o permisos denegados.
          </Typography>
        ) : null}

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        <Stack direction="row" spacing={2} mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={manejarCrearUsuario}
            disabled={cargando || !camaraDisponible}
            fullWidth
          >
            {cargando ? <CircularProgress size={24} /> : "Crear usuario"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose} fullWidth>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CrearUsuarioModal;
