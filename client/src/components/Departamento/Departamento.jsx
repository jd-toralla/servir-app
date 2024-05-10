import React, { useState, useEffect, useMemo } from 'react';
import HttpClientService from '../../services/HttpClientService';
import { messageAlert } from '../../services/GeneralService';

function Departamento() {

    const httpClientService = useMemo(() => new HttpClientService(), []);
    const [errores, setErrores] = useState({});
    const [departamentos, setDepartamentos] = useState([]);
    const [flagEdit, setFlagEdit] = useState(false)
    const [departamento, setDepartamento] = useState({
        codigo: '',
        nombre: '',
        descripcion: ''
    });

    useEffect(() => {
        listarDepartamentos()
    }, []);

    const listarDepartamentos = () => {
        httpClientService.get(`departamentos`).then(res => {
            if (!res.error) {
                setDepartamentos(res);
            } else {
                console.log('ME DA ERROR', res);
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartamento(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar errores al cambiar de valor
        if (!!errores[name]) {
            setErrores(prev => ({ ...prev, [name]: null }));
        }
    };

    const validarCampos = () => {
        const nuevosErrores = {};
        if (!departamento.codigo.trim()) {
            nuevosErrores.codigo = "El código es obligatorio.";
        }
        if (!departamento.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        }
        return nuevosErrores;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresFormulario = validarCampos();

        if (Object.keys(erroresFormulario).length > 0) {
            setErrores(erroresFormulario);
            return;
        }

        if (departamentos.some(dep => dep.codigo === departamento.codigo)) {
            // Actualizar departamento existente
            httpClientService.put(`departamentos/${departamento.codigo}`, departamento).then(res => {
                
                if (!res.error) {
                    messageAlert('Correcto', 'Departamento actualizado', 2000, 'success');
                    listarDepartamentos();
                    setDepartamento({ codigo: '', nombre: '', descripcion: '' });  // Limpiar formulario
                } else {
                    messageAlert('Error', res.error, 2000, 'error');
                }
                setFlagEdit(false)
            });
        } else {

            // Crear nuevo departamento
            httpClientService.post(`departamentos`, departamento).then(res => {
                if (!res.error) {
                    messageAlert('Correcto', res.message, 2000, 'success');
                    listarDepartamentos();
                    setFlagEdit(false)
                    setDepartamento({ codigo: '', nombre: '', descripcion: '' });  // Limpiar formulario
                } else {
                    messageAlert('Error', res.error, 2000, 'error');
                }
            });
            setFlagEdit(false)
        }
    };


    const eliminarDepartamento = (codigo) => {
        httpClientService.delete(`departamentos`, codigo).then(res => {
            if (!res.error) {
                messageAlert('Correcto', res.message, 2000, 'success')
                listarDepartamentos()
            } else {
                messageAlert('Error', res.error, 2000, 'error')
            }
        })
    }

    const cargarDatosDepartamento = (dep) => {
        setFlagEdit(true)
        setDepartamento({
            codigo: dep.codigo,
            nombre: dep.nombre,
            descripcion: dep.descripcion
        });
        setErrores({});
    };

    const cancelarEdicion = () => {
        setFlagEdit(false)
        setDepartamento({
            codigo: '',
            nombre: '',
            descripcion: ''
        });
        setErrores({});
    };

    return (
        <div>
            <h2> <strong>Departamentos</strong> </h2>
            <div className='row'>
                <section className='col-8'>
                    <table className="table">
                        <thead className='bg-warning'>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departamentos.map(dep => (
                                <tr key={dep.codigo}>
                                    <td>{dep.codigo}</td>
                                    <td>{dep.nombre}</td>
                                    <td>{dep.descripcion}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => cargarDatosDepartamento(dep)}>
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <button className="btn btn-dark ml-2" onClick={() => eliminarDepartamento(dep.codigo)}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className='col-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="codigo" className="form-label h5"><strong>Código</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="codigo"
                                name="codigo"
                                value={departamento.codigo}
                                onChange={handleChange}
                                aria-describedby="codigoHelp"
                                disabled={flagEdit}
                            />
                            {errores.codigo && <div id="codigoHelp" className="form-text text-danger">{errores.codigo}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label h5"><strong>Nombre</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={departamento.nombre}
                                onChange={handleChange}
                                aria-describedby="nombreHelp"
                            />
                            {errores.nombre && <div id="nombreHelp" className="form-text text-danger">{errores.nombre}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label h5"><strong>Descripción</strong></label>
                            <textarea
                                className="form-control"
                                id="descripcion"
                                name="descripcion"
                                value={departamento.descripcion}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-info w-100">
                            {flagEdit ? 'Actualizar Departamento' : 'Agregar Departamento'}
                        </button>
                        {flagEdit && (
                            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={cancelarEdicion}>
                                Cancelar Edición
                            </button>
                        )}
                    </form>
                </section>
            </div>

        </div>
    )
}

export default Departamento;
