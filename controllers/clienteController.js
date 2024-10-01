const Clientes = require('../models/Clientes');

// Agrega un nuevo cliente
exports.nuevoCliente = async (req, res) => {
    const cliente = new Clientes(req.body);
    try {
        // Almacenamos el registro
        await cliente.save();
        res.json({
            mensaje: "Se agrego un nuevo cliente!"
        })
    } catch(error) {
        // Si hay un error, console.log y next
        console.log(error);
    }
}
