const express = require('express');
const router = express.Router();

/**
 * ##############################
 * ##    Endpoints entradas   ##
 * ############################
 */

const {
  getEntry,
  newLike,
  deleteLike,
  addEntryPhoto,
  deleteEntryPhoto,
  markResolved,
  newEntry,
} = require('../controllers/entries');

// Importamos los middlewares personalizados.
const authUser = require('../middlewares/authUser');
const userExists = require('../middlewares/userExists');
const authUserOptional = require('../middlewares/authUserOptional');

//Nueva entrada
router.post('/entries', authUser, userExists, newEntry);

//Obtenemos entrada por ID
router.get('/entries/:entryId', authUserOptional, getEntry);

//Dar like a una entrada
router.post('/entries/:entryId/likes', authUser, userExists, newLike);

//Deslikear una entrada
router.delete('/entries/:entryId/likes', authUser, userExists, deleteLike);

//Agregar una foto a una entrada

router.post('/entries/:entryId/photos', authUser, userExists, addEntryPhoto);

//Borrar una foto a una entrada

router.delete(
  '/entries/:entryId/photos/:photoId',
  authUser,
  userExists,
  deleteEntryPhoto
);

//Marcar problema de accesibilidad como resuelto

router.put('/entries/:entryId/resolved', authUser, userExists, markResolved);

module.exports = router;
