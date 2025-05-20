import React from "react";

export default function MainContent() {
  return (
    <main className="main-content">
      <h1>Dashboard Administrador</h1>
      <div className="cards">
        <div className="card">
          <h2>Total de Alumnos</h2>
          <p>0</p>
        </div>
        <div className="card">
          <h2>Porcentaje de Asistencia</h2>
          <p>3</p>
        </div>
        <div className="card">
          <h2>Total de Docentes</h2>
          <p>3</p>
        </div>
      </div>
      <div className="graphs">
        <div className="graph">
          <h3>Gráfico de Alumnos</h3>
          <p>Alumnos este semestre</p>
        </div>
        <div className="graph">
          <h3>Gráfico de Asistencia</h3>
        </div>
      </div>
    </main>
  );
}