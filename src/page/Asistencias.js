import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, startOfWeek, addDays } from "date-fns";

const TablaSemanal = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [semanaInicio, setSemanaInicio] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  useEffect(() => {
    axios.get("http://localhost:5000/usuarios")
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/asistencias")
      .then(res => setAsistencias(res.data))
      .catch(err => console.error(err));
  }, []);

  const obtenerEstado = (usuarioId, fecha) => {
    const fechaStr = format(fecha, "yyyy-MM-dd");
    const asistencia = asistencias.find(a => 
      a.id_usuario === usuarioId && 
      a.fecha_Usuario.startsWith(fechaStr)
    );

    if (!asistencia) return "❌";
    return asistencia.estado_asistencia === "autorizado" ? "✓" : "❌";
  };

  const celdaEstilo = { padding: 10, border: "1px solid #ccc", textAlign: "center" };
  const encabezadoEstilo = { ...celdaEstilo, fontWeight: "bold", backgroundColor: "#f5f5f5" };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>REGISTRO DE ASISTENCIA</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={encabezadoEstilo}>Nombre</th>
            {Array.from({ length: 7 }).map((_, i) => {
              const fecha = addDays(semanaInicio, i);
              return (
                <th key={i} style={encabezadoEstilo}>
                  {format(fecha, "EEE dd/MM")}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {usuarios.map(({ id, nombre_completo }) => (
            <tr key={id}>
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
