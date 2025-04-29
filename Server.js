// Server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./BACK/Controllers/Router');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, './BACK')));
app.use(express.static(path.join(__dirname, './FRONT')));
app.use(path.join(__dirname, './FRONT'), express.static(path.join(__dirname, './FRONT')));

const port = 3000;
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
const mongoConnection = "YourMongoConnection";
mongoose.connect(mongoConnection, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
    console.log('Conexión exitosa a la base de datos');
});

// Usar el enrutador
app.use('/', router);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
