import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import '../style/Dashboard.css';

export default function Dashboard() {
  const [submenu, setSubmenu] = useState({
    productos: false,
    facturas: false,
  });

  const toggleSubmenu = (menu) =>
    setSubmenu({ ...submenu, [menu]: !submenu[menu] });

  return (
    <div className="dashboard">
      <Sidebar submenu={submenu} toggleSubmenu={toggleSubmenu} />
      <MainContent />
    </div>
  );
}