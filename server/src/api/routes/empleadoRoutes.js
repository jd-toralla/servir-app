const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.get('/', empleadoController.listarEmpleados);
router.post('/', empleadoController.crearEmpleado);
router.put('/:codigo', empleadoController.actualizarEmpleado);
router.delete('/:codigo', empleadoController.eliminarEmpleado);

module.exports = router;
