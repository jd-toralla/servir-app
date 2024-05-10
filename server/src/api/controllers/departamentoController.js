const db = require('../../config/dbConfig');

exports.listarDepartamentos = async (req, res) => {
    try {
        const [departamentos] = await db.query('SELECT * FROM Departamento');
        res.json(departamentos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.crearDepartamento = async (req, res) => {
    const { codigo, nombre, descripcion } = req.body;
    try {
        // Verificar si el código ya existe
        const [existing] = await db.query('SELECT codigo FROM Departamento WHERE codigo = ?', [codigo]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'El código del departamento ya existe' });
        }

        // Insertar nuevo departamento
        const result = await db.query('INSERT INTO Departamento (codigo, nombre, descripcion) VALUES (?, ?, ?)', [codigo, nombre, descripcion]);
        res.status(201).json({ message: 'Departamento creado correctamente', id: result[0].insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarDepartamento = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        
        const result = await db.query('UPDATE Departamento SET nombre = ?, descripcion = ? WHERE codigo = ?', [nombre, descripcion, req.params.codigo]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Departamento no encontrado' });
        }
        res.json({ message: 'Departamento actualizado correctamente' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarDepartamento = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM Departamento WHERE codigo = ?', [req.params.codigo]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Departamento no encontrado' });
        }
        res.json({ message: 'Departamento eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
