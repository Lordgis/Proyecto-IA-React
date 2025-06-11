import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";

const columns = [
  {
    field: "nombre_usuario",
    headerName: "Nombre del Usuario",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "modo_registro",
    headerName: "Modo de Registro",
    width: 160,
  },
  {
    field: "estado_asistencia",
    headerName: "Estado",
    width: 120,
    cellClassName: (params) =>
      params.value === "autorizado" ? "estado-autorizado" : "estado-otro",
  },
  {
  field: 'fecha_Usuario',
  headerName: 'Fecha y hora',
  flex: 1.5,
  renderCell: (params) => {
    const fecha = params?.value;
    if (!fecha) return "No registrada";
    try {
      const date = new Date(fecha);
      return date.toLocaleString("es-NI", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "Fecha inválida";
    }
  },
}

];

const TablaUsuarios = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/asistencias")
      .then((response) => {
        const datos = response.data.map((item, index) => ({
          ...item,
          id: item.id_usuario || index,
        }));
        setAsistencias(datos);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar asistencias:", err);
        setError("No se pudieron cargar los registros.");
        setCargando(false);
      });
  }, []);

  return (
    <Box sx={{ p: 0 }}>
      <Grid container justifyContent="center" mb={3}>
        <Typography variant="h4" align="center">
          Registro de Asistencias
        </Typography>
      </Grid>

      {cargando ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Grid container justifyContent="center">
          <Paper
            elevation={2}
            sx={{
              height: 600,
              width: "100%",
              maxWidth: "1000px",
              p: 2,
              borderRadius: 3,
            }}
          >
            <DataGrid
              rows={asistencias}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              disableRowSelectionOnClick
              sx={{
                borderRadius: 2,
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f0f0f0",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f9f9f9",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e0e0e0",
                },
                "& .estado-autorizado": {
                  color: "green",
                  fontWeight: "bold",
                },
                "& .estado-otro": {
                  color: "orange",
                },
              }}
            />
          </Paper>
        </Grid>
      )}
    </Box>
  );
};

export default TablaUsuarios;