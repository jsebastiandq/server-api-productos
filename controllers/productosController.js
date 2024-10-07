const Productos = require('../models/Productos');
const multer = require('multer');

let nanoid; // Declaramos una variable para almacenar el import de nanoid

// Cargar dinámicamente el módulo nanoid en el momento en que se necesite
(async () => {
  nanoid = (await import('nanoid')).nanoid;
})();

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${nanoid()}.${extension}`); // Usa nanoid para generar un identificador único
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    },
};

// Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({ mensaje: error });
        }
        return next();
    });
};

// Agregar un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agrego un producto correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un producto por su ID
exports.mostrarProducto = async(req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto) {
        res.json({mensaje: "Ese producto no existe"});
        next();
    }
    // Mostrar producto
    res.json(producto)
}

// Actualiza producro por ID
exports.actualizarProducto = async(req, res, next) => {
    try {
        // Construir un nuevo producto 
        let nuevoProducto = req.body; 

        // Verificar una nueva imagen 
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto); 
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto}, nuevoProducto, {
            new: true
        }); 
    
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar un producto

exports.eliminarProducto = async(req, res, next) => {
    try {
        await Productos.findByIdAndDelete({_id : req.params.idProducto });
        res.json({mensaje : "El producto ha sido eliminado"});
    } catch (error) {
        console.log(error);
        next();
    }
}