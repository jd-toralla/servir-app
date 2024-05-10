import React, { useState, useEffect, useMemo } from 'react';
import HttpClientService from '../../services/HttpClientService';
import { messageAlert } from '../../services/GeneralService';

function Empleado() {
    const httpClientService = useMemo(() => new HttpClientService(), []);
    const [errores, setErrores] = useState({});
    const [empleados, setEmpleados] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [empleado, setEmpleado] = useState({
        codigo: '',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        departamentoId: ''
    });

    useEffect(() => {
        cargarDepartamentos();
        listarEmpleados();
    }, []);

    const listarEmpleados = () => {
        httpClientService.get('empleados').then(res => {
            if (!res.error) {
                setEmpleados(res);
            } else {
                console.log('Error al listar empleados', res);
            }
        });
    };

    const cargarDepartamentos = () => {
        httpClientService.get('departamentos').then(res => {
            if (!res.error) {
                setDepartamentos(res);
            } else {
                console.log('Error al cargar departamentos', res);
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpleado(prev => ({
            ...prev,
            [name]: value
        }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: null }));
        }
    };

    const cargarDatosEmpleado = (emp) => {
        const fechaFormatted = new Date(emp.fechaNacimiento).toISOString().slice(0, 10);
        setEmpleado({
            codigo: emp.codigo,
            nombres: emp.nombres,
            apellidos: emp.apellidos,
            fechaNacimiento: fechaFormatted,
            departamentoId: emp.departamentoId
        });
        setErrores({});
    };

    const eliminarEmpleado = (codigo) => {
        httpClientService.delete(`empleados/${codigo}`).then(res => {
            if (!res.error) {
                messageAlert('Correcto', 'Empleado eliminado exitosamente', 2000, 'success');
                listarEmpleados();
            } else {
                messageAlert('Error', res.error, 2000, 'error');
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresFormulario = validarCampos();
        if (Object.keys(erroresFormulario).length > 0) {
            setErrores(erroresFormulario);
            return;
        }

        const method = empleado.codigo ? 'put' : 'post';
        const url = empleado.codigo ? `empleados/${empleado.codigo}` : 'empleados';

        httpClientService[method](url, empleado).then(res => {
            if (!res.error) {
                messageAlert('Correcto', res.message, 2000, 'success');
                listarEmpleados();
                setEmpleado({ codigo: '', nombres: '', apellidos: '', fechaNacimiento: '', departamentoId: '' });
            } else {
                messageAlert('Error', res.error, 2000, 'error');
            }
        });
    };

    const validarCampos = () => {
        const nuevosErrores = {};
        if (!empleado.nombres.trim()) {
            nuevosErrores.nombres = "Los nombres son obligatorios.";
        }
        if (!empleado.apellidos.trim()) {
            nuevosErrores.apellidos = "Los apellidos son obligatorios.";
        }
        if (!empleado.departamentoId) {
            nuevosErrores.departamentoId = "El departamento es obligatorio.";
        }
        return nuevosErrores;
    };

    const cancelarEdicion = () => {
        setEmpleado({ codigo: '', nombres: '', apellidos: '', fechaNacimiento: '', departamentoId: '' });
        setErrores({});
    };

    return (
        <div>
            <h2> <strong>Empleados</strong> </h2>
            <div className='row'>
                <section className='col-8'>
                    <table className="table">
                        <thead className='bg-warning'>
                            <tr>
                                <th>Código</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Departamento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map(emp => (
                                <tr key={emp.codigo}>
                                    <td>{emp.codigo}</td>
                                    <td>{emp.nombres}</td>
                                    <td>{emp.apellidos}</td>
                                    <td>{emp.fechaNacimiento}</td>
                                    <td>{departamentos.find(d => d.codigo === emp.departamentoId)?.nombre}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => cargarDatosEmpleado(emp)}>
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <button className="btn btn-dark ml-2" onClick={() => eliminarEmpleado(emp.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className='col-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombres" className="form-label h5"><strong>Nombres</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombres"
                                name="nombres"
                                value={empleado.nombres}
                                onChange={handleChange}
                            />
                            {errores.nombres && <div className="text-danger">{errores.nombres}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label h5"><strong>Apellidos</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="apellidos"
                                name="apellidos"
                                value={empleado.apellidos}
                                onChange={handleChange}
                            />
                            {errores.apellidos && <div className="text-danger">{errores.apellidos}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="departamentoId" className="form-label h5"><strong>Departamento</strong></label>
                            <select
                                className="form-control"
                                id="departamentoId"
                                name="departamentoId"
                                value={empleado.departamentoId}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un departamento</option>
                                {departamentos.map((d) => (
                                    <option key={d.codigo} value={d.codigo}>{d.nombre}</option>
                                ))}
                            </select>
                            {errores.departamentoId && <div className="text-danger">{errores.departamentoId}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fechaNacimiento" className="form-label h5"><strong>Fecha de Nacimiento</strong></label>
                            <input
                                type="date"
                                className="form-control"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                value={empleado.fechaNacimiento}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-info w-100">
                            {empleado.codigo ? 'Actualizar Empleado' : 'Crear Empleado'}
                        </button>
                        {empleado.codigo && (
                            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={cancelarEdicion}>
                                Cancelar Edición
                            </button>
                        )}
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Empleado;
