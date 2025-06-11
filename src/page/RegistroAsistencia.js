import React, { useRef, useState, useEffect } from "react";

export default function RegistroAsistencia() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [captura, setCaptura] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // Detiene la cámara cuando el componente se desmonta
  useEffect(() => {
    return () => {
      detenerCamara();
    };
  }, []);

const iniciarCamara = async () => {
    try {
      const nuevoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(nuevoStream);
      setCaptura(null);
      setMensaje("");
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      setMensaje("❌ No se pudo acceder a la cámara.");
    }
  };

    useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const detenerCamara = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const tomarAsistencia = async () => {
    if (!videoRef.current) return;

    setCargando(true);
    setMensaje("");

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    // Validar que el video esté listo
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setMensaje("❌ Espera un momento para que la cámara se active.");
      setCargando(false);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);

    detenerCamara();

    const dataUrl = canvas.toDataURL("image/jpeg");
    setCaptura(dataUrl);

    try {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
      const formData = new FormData();
      formData.append("imagen", blob, "captura.jpg");

      const res = await fetch("http://localhost:5000/verificar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje(`✅ ${data.resultado} - Bienvenido ${data.nombre_usuario}`);
      } else {
        setMensaje(`⚠️ ${data.resultado}`);
      }
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
      setMensaje("❌ Error de red o servidor.");
    }

    setCargando(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "Segoe UI" }}>
      <h2>Registro de Asistencia por Rostro</h2>

      {!stream && !captura && (
        <button aria-label="Activar cámara" onClick={iniciarCamara} style={botonStyle}>
          Activar Cámara
        </button>
      )}

      {stream && (
        <div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", maxWidth: "480px", borderRadius: "10px", marginBottom: "1rem" }}
          />
          <button
            aria-label="Tomar asistencia"
            onClick={tomarAsistencia}
            disabled={cargando}
            style={botonStyle}
          >
            {cargando ? "Procesando..." : "Tomar Asistencia"}
          </button>
        </div>
      )}

      {captura && (
        <div>
          <p style={{ marginTop: "1rem" }}>📸 Captura:</p>
          <img
            src={captura}
            alt="Captura"
            style={{
              width: "100%",
              maxWidth: "480px",
              borderRadius: "10px",
              border: "2px solid #28a745",
              marginTop: "0.5rem",
            }}
          />
        </div>
      )}

      <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", fontWeight: "bold" }}>{mensaje}</p>
    </div>
  );
}

const botonStyle = {
  padding: "0.8rem 1.5rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  marginTop: "1rem",
};