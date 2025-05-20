import React, { useState } from "react";

export default function AgregarAlumno() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [submenu, setSubmenu] = useState({
    productos: false,
    facturas: false,
  });
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    carnet: "",
    correo: "",
    sexo: "Masculino",
    cedula: "",
    celular: "",
    curso: "",
    direccion: "",
    ciudad: "",
    nacimiento: "",
    estado: false,
    registro: "",
    aula: "",
  });

  const theme = darkMode
    ? {
        backgroundColor: "#121212",
        textColor: "#f0f0f0",
        sidebarBg: "#1a1a1a",
        cardBg: "#1e1e1e",
        navBg: "#333",
      }
    : {
        backgroundColor: "#f8f9fa",
        textColor: "#333",
        sidebarBg: "#ffffff",
        cardBg: "#ffffff",
        navBg: "#f0f0f0",
      };

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 12));
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleSubmenu = (menu) => {
    setSubmenu({
      ...submenu,
      [menu]: !submenu[menu],
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "celular") {
      if (value === "" || (value.length <= 8 && /^\d*$/.test(value))) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del alumno:", formData);
    alert("Alumno registrado exitosamente");
  };

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
      <aside style={{ ...styles.sidebar, backgroundColor: theme.sidebarBg }}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Bienvenido Administrador</h2>
        </div>

        <div style={styles.profile}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="user"
            style={styles.avatar}
          />
        </div>

        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li>
              <div
                onClick={() => toggleSubmenu("productos")}
                style={{ ...styles.navButton, backgroundColor: theme.navBg }}
              >
                📄 Registro
                <span>{submenu.productos ? "▲" : "▼"}</span>
              </div>
              {submenu.productos && (
                <ul style={styles.submenu}>
                  <li style={styles.submenuItem}>📄 Ver Alumnos</li>
                  <li style={styles.submenuItem}>➕ Agregar Alumnos</li>
                  <li style={styles.submenuItem}>📊 Ver Asistencia</li>
                </ul>
              )}
            </li>

            <li>
              <div
                onClick={() => toggleSubmenu("facturas")}
                style={{ ...styles.navButton, backgroundColor: theme.navBg }}
              >
                🧾 Cursos
                <span>{submenu.facturas ? "▲" : "▼"}</span>
              </div>
              {submenu.facturas && (
                <ul style={styles.submenu}>
                  <li style={styles.submenuItem}>📚 Cursos Disponibles</li>
                  <li style={styles.submenuItem}>🧾 Listar Factura</li>
                </ul>
              )}
            </li>

            <li style={{ ...styles.navButton, backgroundColor: theme.navBg }}>
              👨‍🏫 Docente
            </li>
            <li style={{ ...styles.navButton, backgroundColor: theme.navBg }}>
              🧾 Asistencia
            </li>
            <li style={{ ...styles.navButton, backgroundColor: theme.navBg }}>
              👥 Usuario
            </li>
            <li style={{ ...styles.navButton, backgroundColor: theme.navBg }}>
              ⚙️ Configuración
            </li>
          </ul>
        </nav>

        <div style={styles.accessibilityControls}>
          <div style={styles.fontControls}>
            <button onClick={decreaseFont} style={styles.smallButton}>
              ➖
            </button>
            <button onClick={increaseFont} style={styles.smallButton}>
              ➕
            </button>
          </div>
          <button onClick={toggleDarkMode} style={styles.themeButton}>
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </aside>

      {/* Main Form */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
          Agregar Alumno
        </h1>
        <form onSubmit={handleSubmit} style={styles.formGrid}>
          {[
            { label: "Nombre", name: "nombre", type: "text" },
            { label: "Apellido", name: "apellido", type: "text" },
            { label: "Carnet", name: "carnet", type: "text" },
            { label: "Correo institucional", name: "correo", type: "email" },
            { label: "Cédula", name: "cedula", type: "text" },
            { label: "Curso", name: "curso", type: "text" },
            { label: "Dirección", name: "direccion", type: "text" },
            { label: "Ciudad", name: "ciudad", type: "text" },
            { label: "Fecha de nacimiento", name: "nacimiento", type: "date" },
            { label: "Fecha de registro", name: "registro", type: "date" },
            { label: "Aula o laboratorio", name: "aula", type: "text" },
          ].map((field) => (
            <div key={field.name} style={styles.inputGroup}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                style={styles.input}
                placeholder={`Ingrese ${field.label.toLowerCase()}`}
                required
              />
            </div>
          ))}

          {/* Campo de Sexo (select) */}
          <div style={styles.inputGroup}>
            <label>Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleInputChange}
              style={styles.input}
              required
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          {/* Campo de Teléfono (limitado a 8 dígitos) */}
          <div style={styles.inputGroup}>
            <label>Número de celular</label>
            <input
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Ingrese número (8 dígitos)"
              maxLength="8"
              pattern="[0-9]{8}"
              required
            />
          </div>

          {/* Campo de Estado (checkbox) */}
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="estado"
                checked={formData.estado}
                onChange={handleInputChange}
                style={styles.checkboxInput}
              />
              <span style={styles.checkboxCustom}></span>
              Estado (activo)
            </label>
          </div>

          <button type="submit" style={styles.submitButton}>
            Guardar Alumno
          </button>
        </form>
      </main>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    borderRight: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    position: "relative",
  },
  sidebarHeader: {
    marginBottom: "1rem",
  },
  sidebarTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  profile: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  avatar: {
    width: "60px",
    borderRadius: "50%",
    marginBottom: "0.5rem",
  },
  nav: {
    flex: 1,
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navButton: {
    padding: "10px 15px",
    margin: "6px 0",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  submenu: {
    listStyle: "none",
    paddingLeft: "1rem",
    margin: "0.5rem 0",
  },
  submenuItem: {
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "4px 0",
  },
  accessibilityControls: {
    position: "absolute",
    bottom: "20px",
    left: "1rem",
    right: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fontControls: {
    display: "flex",
    gap: "0.5rem",
  },
  smallButton: {
    padding: "5px 10px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#ddd",
  },
  themeButton: {
    padding: "8px",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: "#ddd",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    marginTop: "5px",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    paddingLeft: "25px",
  },
  checkboxInput: {
    position: "absolute",
    opacity: 0,
    cursor: "pointer",
    height: 0,
    width: 0,
  },
  checkboxCustom: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "18px",
    width: "18px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
  "checkboxInput:checked ~ checkboxCustom": {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  "checkboxCustom:after": {
    content: '""',
    position: "absolute",
    display: "none",
    left: "6px",
    top: "2px",
    width: "5px",
    height: "10px",
    border: "solid white",
    borderWidth: "0 2px 2px 0",
    transform: "rotate(45deg)",
  },
  "checkboxInput:checked ~ checkboxCustom:after": {
    display: "block",
  },
  submitButton: {
    gridColumn: "1 / -1",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
};
