import React, { useState } from "react";

export default function VerAlumnos() {
  const [submenu, setSubmenu] = useState({
    registro: true,
    cursos: true,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const [showCarreras, setShowCarreras] = useState(false);

  const alumnos = [
    { id: 1, nombre: "Juan Pérez", carnet: "20230001", correo: "juan@uni.edu", carrera: "Ingeniería Computación", telefono: "12345678", estado: "Activo" },
    { id: 2, nombre: "María García", carnet: "20230002", correo: "maria@uni.edu", carrera: "Ingeniería Industrial", telefono: "87654321", estado: "Activo" },
    { id: 3, nombre: "Carlos López", carnet: "20230003", correo: "carlos@uni.edu", carrera: "Derecho", telefono: "11223344", estado: "Inactivo" },
  ];

  const carreras = [
    "Ingeniería Computación",
    "Ingeniería Industrial",
    "Derecho",
  ];

  const filteredAlumnos = alumnos.filter((alumno) => {
    const matchSearch = alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || alumno.carnet.includes(searchTerm);
    const matchCarrera = selectedCarrera === "" || alumno.carrera === selectedCarrera;
    return matchSearch && matchCarrera;
  });

  const theme = darkMode
    ? {
        backgroundColor: "#121212",
        textColor: "#f0f0f0",
        sidebarBg: "#1a1a1a",
        navBg: "#333",
        cardBg: "#1e1e1e",
      }
    : {
        backgroundColor: "#f8f9fa",
        textColor: "#333",
        sidebarBg: "#ffffff",
        navBg: "#f0f0f0",
        cardBg: "#ffffff",
      };

  const toggleSubmenu = (menu) => setSubmenu({ ...submenu, [menu]: !submenu[menu] });
  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 12));
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: '"Segoe UI", sans-serif',
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontSize,
      }}
    >
      {/* Sidebar */}
      <aside style={{ width: "250px", backgroundColor: theme.sidebarBg, padding: "1rem", display: "flex", flexDirection: "column" }}>
        <h2 style={{ marginBottom: "1rem" }}>Bienvenido Administrador</h2>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="user"
            style={{ width: "60px", borderRadius: "50%" }}
          />
        </div>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <div onClick={() => toggleSubmenu("registro")} style={{ padding: "10px", backgroundColor: theme.navBg, borderRadius: "8px", cursor: "pointer", marginBottom: "5px" }}>
                📄 Registro {submenu.registro ? "▲" : "▼"}
              </div>
              {submenu.registro && (
                <ul style={{ paddingLeft: "1rem" }}>
                  <li style={{ margin: "5px 0" }}>
                    🔍 Ver Alumnos
                  </li>
                  <li style={{ margin: "5px 0" }}>➕ Agregar Alumnos</li>
                  <li style={{ margin: "5px 0" }}>📊 Ver Asistencia
                  </li>
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => toggleSubmenu("cursos")} style={{ padding: "10px", backgroundColor: theme.navBg, borderRadius: "8px", cursor: "pointer", marginBottom: "5px" }}>
                🩾 Cursos {submenu.cursos ? "▲" : "▼"}
              </div>
              {submenu.cursos && (
                <ul style={{ paddingLeft: "1rem" }}>
                  <li style={{ margin: "5px 0" }}>📚 Cursos Disponibles</li>
                  <li style={{ margin: "5px 0" }}>🩾 Listar Factura</li>
                </ul>
              )}
            </li>
            <li style={{ margin: "5px 0" }}>👨‍🏫 Docente</li>
            <li style={{ margin: "5px 0" }}>🩾 Asistencia</li>
            <li style={{ margin: "5px 0" }}>👥 Usuario</li>
            <li style={{ margin: "5px 0" }}>⚙️ Configuración</li>
          </ul>
        </nav>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <button onClick={decreaseFont} style={{ marginRight: "5px" }}>➖</button>
            <button onClick={increaseFont}>➕</button>
          </div>
          <button onClick={toggleDarkMode}>{darkMode ? "🌞" : "🌙"}</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Ver Alumnos</h1>

        {/* Filtros */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Buscar por nombre o carnet"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "10px", flex: 1, borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowCarreras(!showCarreras)}
              style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              {selectedCarrera || "Todas las carreras"} {showCarreras ? "▲" : "▼"}
            </button>
            {showCarreras && (
              <div style={{ position: "absolute", top: "110%", left: 0, backgroundColor: "white", border: "1px solid #ccc", borderRadius: "4px", zIndex: 1 }}>
                <div onClick={() => { setSelectedCarrera(""); setShowCarreras(false); }} style={{ padding: "10px", cursor: "pointer" }}>Todas las carreras</div>
                {carreras.map((carrera) => (
                  <div
                    key={carrera}
                    onClick={() => { setSelectedCarrera(carrera); setShowCarreras(false); }}
                    style={{ padding: "10px", cursor: "pointer" }}
                  >
                    {carrera}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabla */}
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee" }}>
              <th style={{ padding: "10px" }}>#</th>
              <th style={{ padding: "10px" }}>Nombre</th>
              <th style={{ padding: "10px" }}>Carnet</th>
              <th style={{ padding: "10px" }}>Correo</th>
              <th style={{ padding: "10px" }}>Carrera</th>
              <th style={{ padding: "10px" }}>Teléfono</th>
              <th style={{ padding: "10px" }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlumnos.length > 0 ? (
              filteredAlumnos.map((alumno, index) => (
                <tr key={alumno.id} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                  <td style={{ padding: "10px" }}>{index + 1}</td>
                  <td style={{ padding: "10px" }}>{alumno.nombre}</td>
                  <td style={{ padding: "10px" }}>{alumno.carnet}</td>
                  <td style={{ padding: "10px" }}>{alumno.correo}</td>
                  <td style={{ padding: "10px" }}>{alumno.carrera}</td>
                  <td style={{ padding: "10px" }}>{alumno.telefono}</td>
                  <td style={{ padding: "10px", color: alumno.estado === "Activo" ? "green" : "red" }}>{alumno.estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>No se encontraron alumnos</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
