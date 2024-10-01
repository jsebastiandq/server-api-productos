const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')

module.exports = function() {

    // Solo es para probar que todo esta Ok
    // router.get('/', (req, res) => {
    //     res.send('inicio')
    // });

    // router.get('/nosotros', (req, res) => {
    //     res.send('nosotros')
    // });


    // Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente)

    return router;
}