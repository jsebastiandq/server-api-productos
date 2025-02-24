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
        next();
    }
}

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch(error) {
        // Si hay un error, console.log y next
        console.log(error);
        next();
    }
}

// Muestra un cliente por su ID
exports.mostrarCliente = async(req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente) {
        res.json({mensaje: "Ese cliente no existe!"});
        next();
    } 
    // Mostrar cliente
    res.json(cliente);
    
}

// Actualiza un cliente por su (ID)
exports.actualizarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id : req.params.idCliente}, req.body , {
            new: true
        });
        res.json(cliente)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar cliente por su ID
exports.eliminarCliente = async(req, res, next) => {
    try {
        await Clientes.findByIdAndDelete({_id : req.params.idCliente });
        res.json({mensaje : "Cliente ha sido eliminado"});
    } catch (error) {
        console.log(error);
        next();
    }
}