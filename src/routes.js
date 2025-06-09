import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './templates/dashboard/Dashboard'; // asegúrate que existe
import Asistencias from './page/Asistencias';
import Usuarios from './page/Usuarios';
import Login from './templates/Login/Login';
import SideBar from './templates/SideBar/SideBar';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: <SideBar />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'asistencias', element: <Asistencias /> },
      { path: 'usuarios', element: <Usuarios /> },
    ],
  },
]);
