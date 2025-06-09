import React, { useEffect, useState } from 'react';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('http://localhost:5000/usuarios', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener los usuarios');
        return res.json();
      })
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('No se pudieron cargar los usuarios.');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-center text-blue-600 mt-6 animate-pulse">Cargando usuarios...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;
  if (!usuarios.length) return <p className="text-center text-gray-500 mt-6">No hay usuarios registrados.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Listado de Usuarios</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Correo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(({ nombre_usuario, correo, rol }, i) => (
              <tr
                key={i}
                className={`border-b border-gray-200 ${
                  i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{nombre_usuario}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{correo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">{rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
