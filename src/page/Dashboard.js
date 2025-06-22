import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { User, CalendarCheck, CalendarDays, Percent } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [datos, setDatos] = useState({
    totalUsuarios: 0,
    asistenciasHoy: 0,
    asistenciasMes: 0,
    porcentajeAsistencia: 0,
  });
  const [serieMensual, setSerieMensual] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Función para agrupar asistencias del mes
  const calcularEstadisticas = (asistencias, usuarios) => {
    const hoy = new Date().toISOString().slice(0, 10);
    const mesActual = new Date().toISOString().slice(0, 7);
    const diasMes = {};

    const fechaActual = new Date();
    const diasEnMes = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() + 1,
      0
    ).getDate();
    for (let i = 1; i <= diasEnMes; i++) {
      diasMes[String(i).padStart(2, "0")] = 0;
    }

    let asistenciasHoy = 0;
    let asistenciasMes = 0;
    let totalDelMes = 0;

    asistencias.forEach((a) => {
      const fecha = new Date(a.fecha_hora).toISOString().slice(0, 10);
      if (!fecha) return;

      const [anio, mes, dia] = fecha.split("-");
      if (`${anio}-${mes}` === mesActual) {
        totalDelMes++;

        if (a.estado === "autorizado") {
          asistenciasMes++;
          diasMes[dia]++;
          if (fecha === hoy) {
            asistenciasHoy++;
          }
        }
      }
    });

    const porcentajeAsistencia = totalDelMes
      ? Math.round((asistenciasMes / totalDelMes) * 100)
      : 0;

    const serie = Object.entries(diasMes).map(([dia, asistencias]) => ({
      dia,
      asistencias,
    }));

    return {
      totalUsuarios: usuarios.length,
      asistenciasHoy,
      asistenciasMes,
      porcentajeAsistencia,
      serie,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/usuario/dashboard/estadisticas"
        );
        const data = res.data;

        setDatos({
          totalUsuarios: data.totalUsuarios,
          asistenciasHoy: data.asistenciasHoy,
          asistenciasMes: data.asistenciasMes,
          porcentajeAsistencia: data.porcentajeAsistencia,
        });

        setSerieMensual(data.serie);
      } catch (error) {
        console.error("Error al cargar estadísticas del dashboard", error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  if (cargando) {
    return (
      <Grid container justifyContent="center" mt={5}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando datos del dashboard...
        </Typography>
      </Grid>
    );
  }

  const tarjetas = [
    {
      titulo: "Usuarios registrados",
      valor: datos.totalUsuarios,
      icono: <User size={40} />,
      color: "#1976d2",
    },
    {
      titulo: "Asistencias del día",
      valor: datos.asistenciasHoy,
      icono: <CalendarCheck size={40} />,
      color: "#2e7d32",
    },
    {
      titulo: "Asistencias del mes",
      valor: datos.asistenciasMes,
      icono: <CalendarDays size={40} />,
      color: "#ed6c02",
    },
    {
      titulo: "% Asistencia promedio",
      valor: `${datos.porcentajeAsistencia}%`,
      icono: <Percent size={40} />,
      color: "#d32f2f",
    },
  ];

  return (
    <Grid container spacing={3} justifyContent="center" mt={3}>
      {tarjetas.map((t, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              backgroundColor: t.color,
              color: "white",
            }}
          >
            {t.icono}
            <div>
              <Typography variant="body2">{t.titulo}</Typography>
              <Typography variant="h5" fontWeight="bold">
                {t.valor}
              </Typography>
            </div>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Asistencias por día (mes actual)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={serieMensual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dia"
                label={{ value: "Día", position: "insideBottom", offset: -5 }}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="asistencias"
                stroke="#1976d2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
