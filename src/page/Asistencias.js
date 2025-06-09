import React, { useEffect, useState, useMemo, useCallback } from 'react';

// Constantes
// Iconos simples usando símbolos CSS
const IconoCheck = () => <span className="inline-block">✓</span>;
const IconoX = () => <span className="inline-block">✗</span>;
const IconoClock = () => <span className="inline-block">⏰</span>;
const IconoEye = () => <span className="inline-block">👁</span>;
const IconoDownload = () => <span className="inline-block">⬇️</span>;
const IconoUsers = () => <span className="inline-block">👥</span>;
const IconoRefresh = () => <span className="inline-block">🔄</span>;

const ESTADOS = {
  presente: { bg: 'bg-green-100', text: 'text-green-800', icon: IconoCheck, color: 'green' },
  ausente: { bg: 'bg-red-100', text: 'text-red-800', icon: IconoX, color: 'red' },
  tardanza: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: IconoClock, color: 'yellow' },
  autorizado: { bg: 'bg-green-100', text: 'text-green-800', icon: IconoCheck, color: 'green' },
  pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: IconoClock, color: 'yellow' }
};

const MODOS = {
  manual: 'Manual',
  biometrico: 'Biométrico',
  qr: 'Código QR',
  automatico: 'Automático'
};

export default function ProfesorAsistencias() {
  // Estados principales
  const [asistencias, setAsistencias] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Estados de UI
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().slice(0, 10));
  const [vistaActual, setVistaActual] = useState('asistencia'); // 'asistencia', 'calendario', 'historial'
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [historialEstudiante, setHistorialEstudiante] = useState([]);

  // Cargar datos iniciales
  useEffect(() => {
    const controller = new AbortController();
    
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Cargar asistencias desde tu API
        const responseAsistencias = await fetch('http://localhost:5000/asistencias', {
          signal: controller.signal
        });
        
        if (!responseAsistencias.ok) {
          throw new Error(`Error ${responseAsistencias.status}: ${responseAsistencias.statusText}`);
        }
        
        const dataAsistencias = await responseAsistencias.json();
        const asistenciasArray = Array.isArray(dataAsistencias) ? dataAsistencias : [];
        setAsistencias(asistenciasArray);
        
        // Extraer estudiantes únicos de las asistencias
        const estudiantesUnicos = [];
        const nombresVistos = new Set();
        
        asistenciasArray.forEach(asistencia => {
          if (asistencia.nombre_usuario && !nombresVistos.has(asistencia.nombre_usuario)) {
            nombresVistos.add(asistencia.nombre_usuario);
            estudiantesUnicos.push({
              id: asistencia.nombre_usuario, // Usar el nombre como ID único
              nombre: asistencia.nombre_usuario,
              email: `${asistencia.nombre_usuario.toLowerCase().replace(/\s+/g, '.')}@estudiante.com`
            });
          }
        });
        
        setEstudiantes(estudiantesUnicos);
        
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Error al cargar los datos. Verifique que el servidor esté ejecutándose.');
          console.error('Error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
    
    return () => {
      controller.abort();
    };
  }, []);

  // Obtener asistencias del día seleccionado
  const asistenciasDia = useMemo(() => {
    const asistenciasDelDia = asistencias.filter(a => 
      a.fecha_hora.startsWith(fechaSeleccionada)
    );
    
    // Crear lista completa con todos los estudiantes
    return estudiantes.map(estudiante => {
      const asistencia = asistenciasDelDia.find(a => a.nombre_usuario === estudiante.nombre);
      return {
        ...estudiante,
        asistencia: asistencia || null,
        estado: asistencia?.estado || 'sin_registro'
      };
    });
  }, [asistencias, estudiantes, fechaSeleccionada]);

  // Estadísticas del día
  const estadisticas = useMemo(() => {
    const total = asistenciasDia.length;
    const presentes = asistenciasDia.filter(e => e.estado === 'presente').length;
    const ausentes = asistenciasDia.filter(e => e.estado === 'ausente').length;
    const tardanzas = asistenciasDia.filter(e => e.estado === 'tardanza').length;
    const sinRegistro = asistenciasDia.filter(e => e.estado === 'sin_registro').length;
    
    return { total, presentes, ausentes, tardanzas, sinRegistro };
  }, [asistenciasDia]);

  // Cambiar estado de asistencia
  const cambiarEstado = useCallback(async (estudianteId, nuevoEstado) => {
    try {
      setSaving(true);
      
      const estudiante = estudiantes.find(e => e.id === estudianteId);
      if (!estudiante) return;
      
      // Crear o actualizar asistencia
      const nuevaAsistencia = {
        nombre_usuario: estudiante.nombre,
        fecha_hora: `${fechaSeleccionada}T${new Date().toTimeString().slice(0, 8)}`,
        estado: nuevoEstado,
        modo: 'manual'
      };

      // Aquí puedes agregar la llamada POST al backend cuando esté listo
      // const response = await fetch('http://localhost:5000/asistencias', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(nuevaAsistencia)
      // });
      
      // Por ahora actualizar el estado local
      setAsistencias(prev => {
        const filtered = prev.filter(a => !(a.nombre_usuario === estudiante.nombre && a.fecha_hora.startsWith(fechaSeleccionada)));
        return [...filtered, nuevaAsistencia];
      });
      
    } catch (err) {
      setError('Error al guardar la asistencia');
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  }, [estudiantes, fechaSeleccionada]);

  // Marcar todos con un estado
  const marcarTodos = useCallback(async (estado) => {
    try {
      setSaving(true);
      
      for (const estudiante of estudiantes) {
        await cambiarEstado(estudiante.id, estado);
      }
    } finally {
      setSaving(false);
    }
  }, [estudiantes, cambiarEstado]);

  // Ver historial de estudiante
  const verHistorial = useCallback(async (estudiante) => {
    try {
      setLoading(true);
      setEstudianteSeleccionado(estudiante);
      
      // Filtrar historial del estudiante desde los datos existentes
      const historial = asistencias
        .filter(a => a.nombre_usuario === estudiante.nombre)
        .sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora))
        .slice(0, 30); // Últimos 30 registros
      
      setHistorialEstudiante(historial);
      setMostrarHistorial(true);
    } catch (err) {
      setError('Error al cargar el historial');
    } finally {
      setLoading(false);
    }
  }, [asistencias]);

  // Exportar datos
  const exportarDatos = useCallback(() => {
    const datos = asistencias.map(a => ({
      Fecha: a.fecha_hora.slice(0, 10),
      Hora: a.fecha_hora.slice(11, 19),
      Estudiante: a.nombre_usuario,
      Estado: a.estado,
      Modo: a.modo
    }));

    const csv = [
      Object.keys(datos[0]).join(','),
      ...datos.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asistencias_${fechaSeleccionada}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [asistencias, fechaSeleccionada]);

  // Componente de tarjeta de estadísticas
  const StatCard = ({ icon: IconComponent, label, value, color }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 border-${color}-500`}>
      <div className="flex items-center">
        <div className={`text-2xl mr-3 text-${color}-600`}>
          <IconComponent />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        </div>
      </div>
    </div>
  );

  // Componente de estudiante
  const EstudianteCard = ({ estudiante }) => {
    const estadoConfig = ESTADOS[estudiante.estado] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: IconoClock };
    const IconComponent = estadoConfig.icon;

    return (
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-indigo-600 font-semibold">
                {estudiante.nombre.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{estudiante.nombre}</h3>
              <p className="text-sm text-gray-500">{estudiante.email}</p>
            </div>
          </div>
          <button
            onClick={() => verHistorial(estudiante)}
            className="text-indigo-600 hover:text-indigo-800 transition-colors text-lg"
          >
            <IconoEye />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center px-3 py-1 rounded-full ${estadoConfig.bg}`}>
            <span className={`mr-2 ${estadoConfig.text}`}>
              <IconComponent />
            </span>
            <span className={`text-sm font-medium ${estadoConfig.text}`}>
              {estudiante.estado === 'sin_registro' ? 'Sin registro' : estudiante.estado}
            </span>
          </div>

          <div className="flex space-x-1">
            {Object.entries(ESTADOS).map(([estado, config]) => {
              const IconEstado = config.icon;
              return (
                <button
                  key={estado}
                  onClick={() => cambiarEstado(estudiante.id, estado)}
                  className={`p-2 rounded-full transition-colors ${
                    estudiante.estado === estado
                      ? `bg-${config.color}-100 text-${config.color}-600`
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                  disabled={saving}
                >
                  <IconEstado />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (loading && !mostrarHistorial) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl text-indigo-600 mb-4 animate-spin">
            <IconoRefresh />
          </div>
          <p className="text-indigo-600 font-medium">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center">
          <div className="text-4xl text-red-600 mb-4">⚠️</div>
          <p className="text-red-800 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal de Historial */}
      {mostrarHistorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Historial de {estudianteSeleccionado?.nombre}
                </h2>
                <button
                  onClick={() => setMostrarHistorial(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              {historialEstudiante.length > 0 ? (
                <div className="space-y-3">
                  {historialEstudiante.map((registro, index) => {
                    const estadoConfig = ESTADOS[registro.estado];
                    const IconComponent = estadoConfig?.icon || IconoClock;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className={`text-lg mr-3 text-${estadoConfig?.color || 'gray'}-600`}>
                            <IconComponent />
                          </span>
                          <div>
                            <p className="font-medium">{new Date(registro.fecha_hora).toLocaleDateString('es-ES')}</p>
                            <p className="text-sm text-gray-500">{new Date(registro.fecha_hora).toLocaleTimeString('es-ES')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${estadoConfig?.bg} ${estadoConfig?.text}`}>
                            {registro.estado}
                          </span>
                          <span className="text-sm text-gray-500">{MODOS[registro.modo]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No hay registros de asistencia</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Control de Asistencias</h1>
              <p className="text-gray-600">Gestiona la asistencia de tus estudiantes</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={exportarDatos}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span className="mr-2"><IconoDownload /></span>
                Exportar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={IconoUsers} label="Total Estudiantes" value={estadisticas.total} color="blue" />
          <StatCard icon={IconoCheck} label="Presentes" value={estadisticas.presentes} color="green" />
          <StatCard icon={IconoX} label="Ausentes" value={estadisticas.ausentes} color="red" />
          <StatCard icon={IconoClock} label="Tardanzas" value={estadisticas.tardanzas} color="yellow" />
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => marcarTodos('presente')}
              disabled={saving}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <span className="mr-2"><IconoCheck /></span>
              Marcar Todos Presentes
            </button>
            <button
              onClick={() => marcarTodos('ausente')}
              disabled={saving}
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <span className="mr-2"><IconoX /></span>
              Marcar Todos Ausentes
            </button>
            <button
              onClick={() => marcarTodos('tardanza')}
              disabled={saving}
              className="flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
            >
              <span className="mr-2"><IconoClock /></span>
              Marcar Todos Tardanza
            </button>
          </div>
        </div>

        {/* Lista de Estudiantes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Asistencia del {new Date(fechaSeleccionada).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            {saving && (
              <div className="flex items-center text-indigo-600">
                <span className="animate-spin mr-2 text-lg"><IconoRefresh /></span>
                Guardando...
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {asistenciasDia.map(estudiante => (
              <EstudianteCard key={estudiante.id} estudiante={estudiante} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}