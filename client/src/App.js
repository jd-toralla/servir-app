import React, { useState } from 'react';
import './App.css';
import Empleado from './components/Empleado/Empleado';
import Departamento from './components/Departamento/Departamento';

function App() {
  // Estado para controlar qué componente se muestra
  const [vista, setVista] = useState('departamentos');

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className='container'>
          <a className="navbar-brand" href="#"></a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#" onClick={() => setVista('departamentos')}>Departamentos <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setVista('empleados')}>Empleados</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {vista === 'departamentos' && <Departamento />}
        {vista === 'empleados' && <Empleado />}
      </div>
    </>
  );
}

export default App;
