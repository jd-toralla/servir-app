// empleadoController.js
const db = require('../../config/dbConfig');

exports.listarEmpleados = async (req, res) => {
    try {
        const [empleados] = await db.query("SELECT e.*, d.codigo as departamentoId, d.nombre, DATE_FORMAT(e.fechaNacimiento, '%d-%m-%Y') as fechaNacimiento FROM Empleado e INNER JOIN Departamento d ON e.departamentoCodigo = d.codigo;");
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.crearEmpleado = async (req, res) => {
    const { nombres, apellidos, fechaNacimiento, departamentoId } = req.body;

    try {
        // Obtener el último código de empleado
        const [lastCode] = await db.query('SELECT codigo FROM Empleado ORDER BY codigo DESC LIMIT 1');

        let nextCode;
        if (lastCode.length > 0) {
            const lastNumber = parseInt(lastCode[0].codigo.replace('EMP-', '')) + 1;
            nextCode = `EMP-${lastNumber.toString().padStart(4, '0')}`;
        } else {
            nextCode = 'EMP-0001'; // No hay empleados aún, empezar con el primer código
        }

        // Insertar nuevo empleado con el código generado
        const result = await db.query('INSERT INTO Empleado (codigo, nombres, apellidos, fechaNacimiento, departamentoCodigo) VALUES (?, ?, ?, ?, ?)', [nextCode, nombres, apellidos, fechaNacimiento, departamentoId]);
        res.status(201).json({ message: 'Empleado creado correctamente', id: result[0].insertId, codigo: nextCode });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarEmpleado = async (req, res) => {
    const { nombres, apellidos, fechaNacimiento, departamentoId } = req.body;
    
    try {
        const result = await db.query('UPDATE Empleado SET nombres = ?, apellidos = ?, fechaNacimiento = ?, departamentoCodigo = ? WHERE codigo = ?', [nombres, apellidos, fechaNacimiento, departamentoId, req.params.codigo]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarEmpleado = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM Empleado WHERE codigo = ?', [req.params.codigo]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
