// routes.js
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './templates/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // Puedes agregar rutas hijas aquí si las tienes
    children: [
      {
        index: true,
        element: <Dashboard />
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

export default router;
