import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";

const TablaUsuarios = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Acciones
  const handleView = (usuario) => {
    console.log("Ver usuario:", usuario);
    // Aquí puedes abrir un modal o redirigir a una vista de detalles
  };

  const handleEdit = (usuario) => {
    console.log("Editar usuario:", usuario);
    // Aquí puedes redirigir a un formulario de edición
  };

  const handleDelete = (usuario) => {
    console.log("Eliminar usuario:", usuario);
    // Aquí puedes mostrar un diálogo de confirmación y hacer el delete a tu API
  };

  const columns = [
    {
      field: "nombre_completo",
      headerName: "Nombre del Usuario",
      minWidth: 350,
    },
    {
      field: "correo",
      headerName: "Correo",
      width: 250,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 120,
      cellClassName: (params) =>
        params.value === "activo" ? "estado-activo" : "estado-otro",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 180,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => {
        const usuario = params.row;

        return (
          <div className="flex justify-center space-x-2 w-full">
            <button
              onClick={() => handleView(usuario)}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-xl transition-all duration-200 shadow-sm border border-blue-200 hover:border-blue-300"
              title="Ver detalles"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleEdit(usuario)}
              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-xl transition-all duration-200 shadow-sm border border-green-200 hover:border-green-300"
              title="Editar estudiante"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDelete(usuario)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-xl transition-all duration-200 shadow-sm border border-red-200 hover:border-red-300"
              title="Eliminar estudiante"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/usuarios")
      .then((response) => {
        const datos = response.data.map((item, index) => ({
          ...item,
          id: item.id_usuario || index,
        }));
        setAsistencias(datos);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar usuarios:", err);
        setError("No se pudieron cargar los registros.");
        setCargando(false);
      });
  }, []);

  return (
    <Box sx={{ p: 0 }}>
      <Grid container justifyContent="center" mb={3}>
        <Typography variant="h4" align="center">
          Registro de usuarios
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
                "& .estado-activo": {
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