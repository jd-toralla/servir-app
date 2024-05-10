import './App.css';
import Empleado from './components/Empleado/Empleado';
import Departamento from './components/Departamento/Departamento';

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-info ">
        <div className='container'>
          <span className="navbar-brand">Administración de Empleados y Departamentos</span>
        </div>
      </nav>
      <div className="container mt-4">
        <Departamento />
        <hr></hr>
        <div className='mb-5'>
          <Empleado />
        </div>


      </div>
    </>
  );
}

export default App;
