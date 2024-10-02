const express = require('express');
const routes= require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configuración de strictQuery
mongoose.set('strictQuery', false);

// Configuracion de MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/restapis', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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

// Rutas de la app
app.use('/', routes());

// Conectamos MongoDB
connectDB();

//Puerto del Servidor
app.listen(5001);