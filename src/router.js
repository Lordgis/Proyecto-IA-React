import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Asistencias from './page/Asistencias';
import Usuarios from './page/Usuarios';
import ReporteAsistencia from './page/ReporteAsistencia';
//import Login from './templates/Login/Login';
import SideBar from './templates/SideBar/SideBar';
import RegistroAsistencia from './page/RegistroAsistencia';

const Bienvenida = () => <div style={{ padding: 24 }}>Bienvenido al Prototipo de asistencia Con IA</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SideBar />,
    children: [
      {
        index: true, // se muestra por defecto al ir a /menu
        element: <Bienvenida />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'asistencias',
        element: <Asistencias />,
      },
      {
        path: 'estudiantes',
        element: <Usuarios />,
      },
      {
        path: 'registro',
        element: <RegistroAsistencia />,
      },{
        path: 'reportes',
        element: <ReporteAsistencia />,
      },
    ],
  },
]);
