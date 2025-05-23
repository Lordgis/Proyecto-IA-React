import { Routes, Route } from "react-router-dom";
import ListarAlumnos from "./components/ListarAlumnos";
import SignIn from "./templates/sign-in/SignIn";
import Dashboard from "./templates/dashboard/Dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/ListarAlumnos" element={<ListarAlumnos />} />
    </Routes>
  );
}

export default App;