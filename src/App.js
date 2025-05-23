import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      {/* Layout general, navbar, etc. */}
      <Outlet /> {/* Aquí se mostrará Dashboard */}
    </div>
  );
}
