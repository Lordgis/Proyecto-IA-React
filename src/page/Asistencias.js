import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, startOfWeek, addDays } from "date-fns";
import { es } from "date-fns/locale"; // 👈 Importar el locale español

const TablaSemanal = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [semanaInicio, setSemanaInicio] = useState(startOfWeek(new Date(), { weekStartsOn: 1, locale: es }));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:5000/usuarios"),
      axios.get("http://localhost:5000/asistencias")
    ])
      .then(([usuariosRes, asistenciasRes]) => {
        setUsuarios(usuariosRes.data);
        setAsistencias(asistenciasRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Error al cargar datos desde el servidor.");
        setLoading(false);
      });
  }, []);

  const obtenerEstado = (usuarioId, fecha) => {
    const fechaStr = format(fecha, "yyyy-MM-dd");
    const asistencia = asistencias.find(a =>
      a.id_usuario === usuarioId &&
      format(new Date(a.fecha_Usuario), "yyyy-MM-dd") === fechaStr
    );

    if (!asistencia) return "❌";
    return asistencia.estado_asistencia === "autorizado" ? "✓" : "❌";
  };

  const cambiarSemana = (dias) => {
    setSemanaInicio(prev => addDays(prev, dias));
  };

  const celdaEstilo = { padding: 10, border: "1px solid #ccc", textAlign: "center" };
  const encabezadoEstilo = { ...celdaEstilo, fontWeight: "bold", backgroundColor: "#f5f5f5" };

  if (loading) return <p style={{ textAlign: "center" }}>Cargando datos...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>REGISTRO DE ASISTENCIA</h2>

      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <button onClick={() => cambiarSemana(-7)} style={{ marginRight: 10 }}>← Semana anterior</button>
        <button onClick={() => cambiarSemana(7)}>Semana siguiente →</button>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={encabezadoEstilo}>#</th>
            <th style={encabezadoEstilo}>Nombre</th>
            {Array.from({ length: 7 }).map((_, i) => {
              const fecha = addDays(semanaInicio, i);
              return (
                <th key={i} style={encabezadoEstilo}>
                  {format(fecha, "EEEE dd/MM", { locale: es })} {/* 👈 Días en español */}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {usuarios.map(({ id, nombre_completo }, idx) => (
            <tr key={id}>
              <td style={celdaEstilo}>{idx + 1}</td>
              <td style={celdaEstilo}>{nombre_completo}</td>
              {Array.from({ length: 7 }).map((_, i) => {
                const diaFecha = addDays(semanaInicio, i);
                return (
                  <td key={i} style={celdaEstilo}>
                    {obtenerEstado(id, diaFecha)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaSemanal;
