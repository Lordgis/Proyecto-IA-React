import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleSubmenu = (menu) =>
    setOpenSubmenu((prev) => (prev === menu ? null : menu));

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const increaseFont = () => setFontSize((f) => Math.min(f + 2, 24));
  const decreaseFont = () => setFontSize((f) => Math.max(f - 2, 12));

  const theme = darkMode
    ? {
        background: "#121212",
        sidebarBg: "#1f1f1f",
        text: "#e0e0e0",
        hover: "#333",
        activeBg: "#333",
      }
    : {
        background: "#f9fafb",
        sidebarBg: "#fff",
        text: "#333",
        hover: "#eee",
        activeBg: "#ddd",
      };

  const activeStyle = {
    backgroundColor: theme.activeBg,
    fontWeight: "600",
    borderRadius: "6px",
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.background,
        color: theme.text,
        fontSize,
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <aside
        style={{
          width: "250px",
          backgroundColor: theme.sidebarBg,
          padding: "1rem",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <header
          style={{
            fontSize: "1.2rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            textAlign: "center",
            borderBottom: `2px solid ${theme.hover}`,
            paddingBottom: "0.5rem",
          }}
        >
          👤 Administrador
        </header>

        <nav style={{ flexGrow: 1 }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              userSelect: "none",
            }}
          >
            {/* Registro */}
            <li>
              <button
                onClick={() => toggleSubmenu("registro")}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  background: "none",
                  border: "none",
                  color: theme.text,
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius: "6px",
                  marginBottom: openSubmenu === "registro" ? "0.5rem" : "1rem",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = theme.hover)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                📄 Registro
                <span
                  style={{
                    transform:
                      openSubmenu === "registro" ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                    display: "inline-block",
                  }}
                >
                  ▼
                </span>
              </button>
              {openSubmenu === "registro" && (
                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: "1.5rem",
                    marginTop: 0,
                    marginBottom: "1rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <li>
                    <NavLink
                      to=""
                      style={({ isActive }) => ({
                        display: "block",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        color: theme.text,
                        marginBottom: "4px",
                        ...(isActive ? activeStyle : {}),
                      })}
                    >
                      📄 Ver Alumnos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/agregar-alumnos"
                      style={({ isActive }) => ({
                        display: "block",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        color: theme.text,
                        marginBottom: "4px",
                        ...(isActive ? activeStyle : {}),
                      })}
                    >
                      ➕ Agregar Alumnos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ver-asistencia"
                      style={({ isActive }) => ({
                        display: "block",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        color: theme.text,
                        marginBottom: "4px",
                        ...(isActive ? activeStyle : {}),
                      })}
                    >
                      📊 Ver Asistencia
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Cursos */}
            <li>
              <button
                onClick={() => toggleSubmenu("cursos")}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  background: "none",
                  border: "none",
                  color: theme.text,
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius: "6px",
                  marginBottom: openSubmenu === "cursos" ? "0.5rem" : "1rem",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = theme.hover)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                🧾 Cursos
                <span
                  style={{
                    transform:
                      openSubmenu === "cursos" ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                    display: "inline-block",
                  }}
                >
                  ▼
                </span>
              </button>
              {openSubmenu === "cursos" && (
                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: "1.5rem",
                    marginTop: 0,
                    marginBottom: "1rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <li>
                    <NavLink
                      to="/cursos-disponibles"
                      style={({ isActive }) => ({
                        display: "block",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        color: theme.text,
                        marginBottom: "4px",
                        ...(isActive ? activeStyle : {}),
                      })}
                    >
                      📚 Cursos Disponibles
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/listar-factura"
                      style={({ isActive }) => ({
                        display: "block",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        color: theme.text,
                        marginBottom: "4px",
                        ...(isActive ? activeStyle : {}),
                      })}
                    >
                      🧾 Listar Factura
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Links sin submenu */}
            <li>
              <NavLink
                to="/docente"
                style={({ isActive }) => ({
                  display: "block",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: theme.text,
                  marginBottom: "0.7rem",
                  fontWeight: isActive ? "600" : "normal",
                  backgroundColor: isActive ? theme.activeBg : "transparent",
                })}
              >
                👨‍🏫 Docente
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/asistencia"
                style={({ isActive }) => ({
                  display: "block",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: theme.text,
                  marginBottom: "0.7rem",
                  fontWeight: isActive ? "600" : "normal",
                  backgroundColor: isActive ? theme.activeBg : "transparent",
                })}
              >
                🧾 Asistencia
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/usuario"
                style={({ isActive }) => ({
                  display: "block",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: theme.text,
                  marginBottom: "0.7rem",
                  fontWeight: isActive ? "600" : "normal",
                  backgroundColor: isActive ? theme.activeBg : "transparent",
                })}
              >
                👥 Usuario
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/configuracion"
                style={({ isActive }) => ({
                  display: "block",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: theme.text,
                  fontWeight: isActive ? "600" : "normal",
                  backgroundColor: isActive ? theme.activeBg : "transparent",
                })}
              >
                ⚙️ Configuración
              </NavLink>
            </li>
          </ul>
        </nav>

        <div
          style={{
            borderTop: `1px solid ${theme.hover}`,
            paddingTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <button
              onClick={decreaseFont}
              style={{
                background: "none",
                border: "1px solid #888",
                color: theme.text,
                borderRadius: "4px",
                padding: "3px 8px",
                marginRight: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              A-
            </button>
            <button
              onClick={increaseFont}
              style={{
                background: "none",
                border: "1px solid #888",
                color: theme.text,
                borderRadius: "4px",
                padding: "3px 8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              A+
            </button>
          </div>
          <button
            onClick={toggleDarkMode}
            style={{
              background: "none",
              border: "1px solid #888",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              color: theme.text,
              fontSize: "1.2rem",
              lineHeight: "0",
              userSelect: "none",
            }}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </aside>
    </div>
  );
}
