// TablaUsuarios.js
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import CrearUsuarioModal from "../Modal/CrearUsuarioModal";
import EditarUsuarioModal from "../Modal/EditarUsuarioModal";

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const cargarUsuarios = () => {
    setCargando(true);
    axios
      .get("http://localhost:5000/usuarios")
      .then((res) => {
        const datos = res.data.map((item, index) => ({
          ...item,
          id: item.id || index,
        }));
        setUsuarios(datos);
        setCargando(false);
        setError(null);
      })
      .catch(() => {
        setError("No se pudieron cargar los registros.");
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleCrearUsuario = () => {
    setEditarUsuario(null);
    setModalAbierto(true);
  };

  const handleEdit = (usuario) => {
    setEditarUsuario(usuario);
    setModalAbierto(true);
  };

  const handleDelete = (usuario) => {
    setConfirmarEliminar(usuario);
  };

  const confirmarEliminarUsuario = () => {
    axios
      .delete(`http://localhost:5000/usuario/eliminar/${confirmarEliminar.id}`)
      .then(() => {
        cargarUsuarios();
        setConfirmarEliminar(null);
        setMensaje({
          tipo: "success",
          texto: "Usuario eliminado correctamente",
        });
      })
      .catch(() => {
        setMensaje({ tipo: "error", texto: "Error al eliminar el usuario." });
      });
  };

  const columns = [
    {
      field: "nombre_completo",
      headerName: "Nombre del Usuario",
      minWidth: 350,
      flex: 1,
    },
    { field: "correo", headerName: "Correo", width: 250 },
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
              onClick={() => alert(JSON.stringify(usuario, null, 2))}
              title="Ver detalles"
            >
              <Eye className="h-4 w-4 text-blue-600" />
            </button>
            <button onClick={() => handleEdit(usuario)} title="Editar usuario">
              <Edit className="h-4 w-4 text-green-600" />
            </button>
            <button
              onClick={() => handleDelete(usuario)}
              title="Eliminar usuario"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        justifyContent="center"
        mb={3}
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" align="center">
            Registro de usuarios
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCrearUsuario}
          >
            Crear Usuario
          </Button>
        </Grid>
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
              rows={usuarios}
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

      {/* Modal crear/editar */}
      {/* Modal crear */}
{!editarUsuario && modalAbierto && (
  <CrearUsuarioModal
    abierto={modalAbierto}
    onClose={() => setModalAbierto(false)}
    onUsuarioCreado={() => {
      cargarUsuarios();
      setModalAbierto(false);
    }}
  />
)}

{/* Modal editar */}
{editarUsuario && (
  <EditarUsuarioModal
    abierto={modalAbierto}
    usuario={editarUsuario}
    onClose={() => {
      setModalAbierto(false);
      setEditarUsuario(null);
    }}
    onUsuarioActualizado={() => {
      cargarUsuarios();
      setModalAbierto(false);
      setEditarUsuario(null);
    }}
  />
)}


      {/* Confirmar eliminación */}
      <Dialog
        open={!!confirmarEliminar}
        onClose={() => setConfirmarEliminar(null)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Seguro que quieres eliminar al usuario "
          {confirmarEliminar?.nombre_completo}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmarEliminar(null)}>Cancelar</Button>
          <Button color="error" onClick={confirmarEliminarUsuario}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar mensaje */}
      <Snackbar
        open={!!mensaje}
        autoHideDuration={3000}
        onClose={() => setMensaje(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setMensaje(null)}
          severity={mensaje?.tipo}
          sx={{ width: "100%" }}
        >
          {mensaje?.texto}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TablaUsuarios;
