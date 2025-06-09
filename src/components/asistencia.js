import React, { useRef, useState } from 'react';

export default function Asistencia() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mensaje, setMensaje] = useState('');

  // Solicitar permiso para cámara y mostrar video
  React.useEffect(() => {
    async function iniciarCamara() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setMensaje('No se pudo acceder a la cámara');
      }
    }
    iniciarCamara();
  }, []);

  // Capturar imagen y enviarla al backend
  const capturarYEnviar = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Imagen = canvas.toDataURL('image/jpeg').split(',')[1];

    try {
      const res = await fetch('http://localhost:5000/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagen: base64Imagen }),
      });
      const data = await res.json();
      setMensaje(data.mensaje || 'No se recibió respuesta');
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Registrar Asistencia</h2>
      <video ref={videoRef} autoPlay playsInline style={{ width: '320px', height: '240px' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={capturarYEnviar}>Tomar foto y registrar</button>
      <p>{mensaje}</p>
    </div>
  );
}
