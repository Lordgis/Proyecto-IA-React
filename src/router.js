import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './templates/dashboard/Dashboard';
import Asistencias from './page/Asistencias';
import Usuarios from './page/Usuarios';
import Login from './templates/Login/Login';
import SideBar from './templates/SideBar/SideBar';
import RegistroAsistencia from './page/RegistroAsistencia';

const Bienvenida = () => <div style={{ padding: 24 }}>Bienvenido al sistema de asistencia</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/App',
    element: <SideBar />,
    children: [
      {
        index: true, 
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
      },
    ],
  },
]);
