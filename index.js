const express = require('express');
const routes= require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Conectamos a MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
});

// Establecer la opción strictQuery - Quitamos advertencia de QUERY
mongoose.set('strictQuery', true);

//Creamos el servidor
const app = express();

// Habilitar Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Rutas de la app
app.use('/', routes());

//Puerto
app.listen(5000);