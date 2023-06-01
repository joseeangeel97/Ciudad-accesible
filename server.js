//Variables .env
require('dotenv').config();

//Express
const express = require('express');

//Evita problemas con el cliente

const cors = require ("cors");

app.use(cors());

//Morgan
const morgan = require('morgan');

//Chalk para la terminal
const chalk = require('chalk');

//Creamos el servidor.
const app = express();

//Middleware que deserializa un body en formato raw creando la propiedad body en el objeto request.
app.use(express.json());

//Middleware de petición entrante (morgan)
app.use(morgan('dev'));

/**
 * ##############################
 * ##    Endpoints entradas   ##
 * ############################
 */

const {
  addEntryPhoto,
  deleteEntryPhoto,
  markResolved,
  newUser,
} = require('./controllers/entries');

//Registro de usuario

app.post('/users', newUser);

// Login de usuario.
app.post('/users/login', loginUser);

//Agregar una foto a una entrada

app.post('/entries/:entryId/photos', authUser, userExists, addEntryPhoto);

//Borrar una foto a una entrada

app.delete('/entries/:entryId/photos', authUser, userExists, deleteEntryPhoto);

//Marcar problema de accesibilidad como resuelto

app.put('/entries/:entryId/photos', authUser, userExists, markResolved);

/**
 * ##############################
 * ## Middlewares importantes ##
 * ############################
 */

//Middleware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message,
  });
});

//Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ruta no encontrada',
  });
});

//Middleware escucha peticiones al puerto 8000
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
