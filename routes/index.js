const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')

module.exports = function() {

    // Solo es para probar que todo esta Ok
    // router.get('/', (req, res) => {
    //     res.send('inicio')
    // });

    // router.get('/nosotros', (req, res) => {
    //     res.send('nosotros')
    // });


    /** CLIENTES */

    // Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente)

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    // Muestra un cliente en especifico (ID)
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);
 
    // Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /** PRODUCTOS */

    // Nuevo producto
    router.post('/productos', productosController.subirArchivo ,productosController.nuevoProducto);


    return router;
}