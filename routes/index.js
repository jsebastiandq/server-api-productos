const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = function() {

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

    // Obtener los productos
    router.get('/productos', productosController.mostrarProductos)

    // Mostrar por ID un Producto
    router.get('/producto/:idProducto', productosController.mostrarProducto);

    // Actualizar un producto por su ID
    router.put('/producto/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);

    // Eliminar un producto
    router.delete('/producto/:idProducto', productosController.eliminarProducto);

    /** PEDIDOS */

    // Agregar un pedido
    router.post('/pedidos', pedidosController.nuevoPedido);

    // Ver todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    return router;
}