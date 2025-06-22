import React, { useState } from "react";

const ReporteAsistencia = () => {
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerDatos = async () => {
    if (!inicio || !fin) {
      alert("Por favor selecciona ambas fechas.");
      return;
    }

    try {
      setCargando(true);
      const res = await fetch(
        `http://localhost:5000/reporte/obtener?inicio=${inicio}&fin=${fin}`
      );
      const data = await res.json();

      if (res.ok) {
        setDatos(data);
      } else {
        alert(data.error || "Error al obtener el reporte.");
      }
    } catch (err) {
      console.error("Error al obtener datos:", err);
      alert("Hubo un problema al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  const descargarExcel = async () => {
    if (!inicio || !fin) {
      alert("Selecciona el rango de fechas primero.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/reporte/excel?inicio=${inicio}&fin=${fin}`
      );
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Error al generar Excel.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reporte_asistencia_${inicio}_a_${fin}.xlsx`;
      a.click();
    } catch (err) {
      console.error("Error al descargar Excel:", err);
      alert("No se pudo descargar el Excel.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📊 Reporte de Asistencia
      </h2>

      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Fecha inicio</label>
          <input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Fecha fin</label>
          <input
            type="date"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <button
          onClick={obtenerDatos}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {cargando ? "Buscando..." : "Buscar"}
        </button>

        <button
          onClick={descargarExcel}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
        >
          Descargar Excel
        </button>
      </div>

      {datos.length > 0 ? (
        <div className="overflow-auto max-h-[60vh] rounded border shadow">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 bg-blue-100 text-gray-800 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Nombre</th>
                <th className="px-4 py-3 border">Fecha</th>
                <th className="px-4 py-3 border text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((asistencia, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border">
                    {asistencia.nombre_usuario || "Desconocido"}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(asistencia.fecha_hora).toLocaleString("es-NI", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-2 border text-center capitalize">
                    {asistencia.estado === "autorizado" ? (
                      <span className="text-green-600 font-semibold">
                        ✔ Autorizado
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        ✖ {asistencia.estado}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !cargando && (
          <p className="text-gray-500 mt-4">
            No hay datos en el rango seleccionado.
          </p>
        )
      )}
    </div>
  );
};

export default ReporteAsistencia;
