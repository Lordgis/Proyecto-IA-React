import React, { useState } from "react";

export default function DashboardAdmin() {
  const [submenu, setSubmenu] = useState({
    productos: false,
    facturas: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleSubmenu = (menu) =>
    setSubmenu({ ...submenu, [menu]: !submenu[menu] });

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 12));

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

  return (
    <div
      style={{
        ...styles.app,
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

        {/* Accesibilidad */}
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

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.dashboardTitle}>Dashboard Administrador</h1>
        <div style={styles.cards}>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg }}>
            <h2>Total de Alumnos</h2>
            <p>0</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg }}>
            <h2>Porcentaje de Asistencia</h2>
            <p>3</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: theme.cardBg }}>
            <h2>Total de Docentes</h2>
            <p>3</p>
          </div>
        </div>

        <div style={styles.graphSection}>
          <div style={{ ...styles.graph, backgroundColor: theme.cardBg }}>
            <h3>Gráfico de Alumnos</h3>
            <p>Alumnos este semestre</p>
          </div>
          <div style={{ ...styles.graph, backgroundColor: theme.cardBg }}>
            <h3>Gráfico de Asistencia</h3>
          </div>
        </div>
      </main>
    </div>
  );
}

// Estilos
const styles = {
  app: {
    display: "flex",
    height: "100vh",
    fontFamily: '"Segoe UI", sans-serif',
    transition: "all 0.3s ease",
  },
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
    marginTop: "0.3rem",
  },
  submenuItem: {
    padding: "6px 10px",
    borderRadius: "8px",
    marginBottom: "4px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  main: {
    flex: 1,
    padding: "2rem",
    overflowY: "auto",
  },
  dashboardTitle: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
  },
  cards: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
  },
  card: {
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    flex: 1,
    textAlign: "center",
  },
  graphSection: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  graph: {
    flex: 1,
    minHeight: "150px",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
};