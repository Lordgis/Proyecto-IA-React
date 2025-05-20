import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Registro from "./components/registro";
import Veralumno from "./components/veralumno";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/veralumno" element={<Veralumno />} />
    </Routes>
  );
}

export default App;