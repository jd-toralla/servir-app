const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const empleadoRoutes = require('./api/routes/empleadoRoutes');
const departamentoRoutes = require('./api/routes/departamentoRoutes');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(bodyParser.json());

// Rutas
app.use('/empleados', empleadoRoutes);
app.use('/departamentos', departamentoRoutes);

// Manejo de errores centralizado
app.use((err, req, res, next) => {
    res.status(500).send('Ocurrió un error interno');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
