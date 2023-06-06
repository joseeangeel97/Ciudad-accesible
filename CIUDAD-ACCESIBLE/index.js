//Variables .env
require('dotenv').config();

//Express
const express = require('express');
const fileUpload = require('express-fileupload');

//Creamos el servidor.
const app = express();

//Evita problemas con el cliente

const cors = require('cors');

app.use(cors());

// Importamos las rutas.
const userRoutes = require('./src/routes/userRoutes');
const entriesRoutes = require('./src/routes/entriesRoutes');

//Morgan
const morgan = require('morgan');

//Chalk para la terminal
const chalk = require('chalk');

//Middleware que deserializa un body en formato raw creando la propiedad body en el objeto request.
app.use(express.json());

app.use(fileUpload());
//Middleware de petición entrante (morgan)
app.use(morgan('dev'));

// Middleware que indica a express donde se encuentran las rutas de los usuarios y los tweets.
app.use(userRoutes);
app.use(entriesRoutes);
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
