const Pedidos = require('../models/Pedidos');

// Agregar un nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje : 'Se agregó un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar un pedido por ID
exports.mostrarPedido = async(req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    if(!pedido){
        res.json({mensaje: "Ese pedido no existe"});
        return next();
    }
    res.json(pedido)
}

// Actualizar pedido por ID
exports.actualizarPedido = async(req, res, next) => {
    try {
        let pedido = await Pedidos.findByIdAndUpdate({_id : req.params.idPedido}, req.body, {
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Elminar pedido por ID
exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findByIdAndDelete({_id : req.params.idPedido})
        res.json({mensaje: "El pedido se elimino"})
    } catch (error) {
        console.log(error);
        next();
    }
}