import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Estudiantes from '../../pages/Estudiantes';
import Asistencias from '../../pages/Asistencias';

export default function MainGrid() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/estudiantes" element={<Estudiantes />} />
      <Route path="/asistencias" element={<Asistencias />} />
    </Routes>
  );
}
