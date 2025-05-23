import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [registrado, setRegistrado] = useState(false);

  const navigate = useNavigate();

  const manejarRegistro = (e) => {
    e.preventDefault();
    if (!correo.trim() || !contrasena.trim()) return;

    // Simula que se registra el usuario
    setUsuario({ nombre, correo, contrasena });
    setRegistrado(true);

    // Redirecciona al menú
    navigate("/menu");
  };

  const manejarOlvidoContrasena = () => {
    alert("🔐 Funcionalidad para recuperar contraseña próximamente.");
  };

  return (
    <div style={container}>
      <div style={imagenLateral}>
        <img
          src="https://zascita.com/wp-content/uploads/2024/08/La-tecnologia-de-reconocimiento-facial-Seguridad-privada-Zascita.png"
          alt="Robot"
          style={robotLogo}
        />
      </div>

      <div style={formContainer}>
        <img
          src="https://posgrado.uni.edu.ni/wp-content/uploads/2025/01/Logo-DEPEC-01-copy.jpg"
          alt="Logo UNI-DEPEC"
          style={logoUNI}
        />
        <h2 style={titulo}>Inicio de Sesión</h2>
        <form onSubmit={manejarRegistro} style={form}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={input}
            required
          />
          <button type="submit" style={boton}>
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={manejarOlvidoContrasena}
            style={linkBoton}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </form>

        {registrado && usuario && (
          <div style={resultado}>
            <h3>✅ Bienvenido</h3>
            <p>
              <strong>Correo:</strong> {usuario.correo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Estilos
const container = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#2c2d2d",
};

const imagenLateral = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem",
};

const robotLogo = {
  width: "100%",
  height: "100%",
  maxWidth: "600px",
  maxHeight: "600px",
  objectFit: "contain",
};

const formContainer = {
  flex: 1,
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const logoUNI = {
  width: "120px",
  marginBottom: "1.5rem",
};

const titulo = {
  fontSize: "2rem",
  marginBottom: "1rem",
  fontWeight: "bold",
};

const form = {
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const input = {
  padding: "0.8rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const boton = {
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: "#0057a0",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
};

const linkBoton = {
  marginTop: "0.5rem",
  background: "none",
  border: "none",
  color: "#0057a0",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "0.9rem",
};

const resultado = {
  marginTop: "2rem",
  textAlign: "left",
  background: "#e0f7fa",
  padding: "1rem",
  borderRadius: "10px",
};
