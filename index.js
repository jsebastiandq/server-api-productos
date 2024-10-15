const express = require('express');
const routes= require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// CORS permite que un cliente se conecte
const cors = require('cors');

// Configuración de strictQuery
mongoose.set('strictQuery', false);

// Configuracion de MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/restapis');
    console.log('Conexión a MongoDB exitosa');
  } catch (err) {
    console.error('Error al conectar a MongoDB', err);
  }
};

//Creamos el servidor
const app = express();

// Habilitar Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Rutas de la app
app.use('/', routes());

// Conectamos MongoDB
connectDB();

//Puerto del Servidor
app.listen(3001);