
const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');

router.get('/', departamentoController.listarDepartamentos);
router.post('/', departamentoController.crearDepartamento);
router.put('/:codigo', departamentoController.actualizarDepartamento);
router.delete('/:codigo', departamentoController.eliminarDepartamento);

module.exports = router