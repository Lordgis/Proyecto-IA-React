// routes.js
import { createBrowserRouter } from 'react-router-dom';
import SideBar from './templates/SideBar/SideBar'; 
import Usuarios from './page/Usuarios';
import Login from './templates/Login/Login';
import Dashboard from './templates/dashboard/Dashboard'; 

export const routes = createBrowserRouter([
  {
    path: '/SideBar',
    element: <SideBar />,
  },
  {
    path: '/',
    element: <SideBar />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'usuarios',
        element: <Usuarios />,
      },
    ],
  },
]);
