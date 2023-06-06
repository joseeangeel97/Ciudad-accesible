const deletePhotoQuery = require('../../db/queries/entries/deletePhotoQuery');
const selectEntryByIdQuery = require('../../db/queries/entries/selectEntryByIdQuery');
const checkPhotoExists = require('../../db/queries/entries/checkPhotoExists');
const { generateError, deletePhoto } = require('../../helpers');

const deleteEntryPhoto = async (req, res, next) => {
  try {
    //Obtenemos parametros entryId y photoId
    const { entryId, photoId } = req.params;

    //Obtenemos la entrada correspondiente al entryId. 2º Argumento verifica si el propietario actual es el de la entrada
    const entry = await selectEntryByIdQuery(entryId, req.user.id);

    //Vemos si el usuario actual tiene permisos necesarios para eliminar foto
    //Si no es propietario...
    if (!entry.owner) {
      generateError('No tienes suficientes permisos', 401);
    }

    // Verificar si la foto existe y está asociada a la entrada.
    const photoExists = await checkPhotoExists(entryId, photoId);

    //Si no existe la foto...
    if (!photoExists) {
      generateError('Foto no encontrada', 404);
    }

    //Eliminamos ref de la entrada en la foto
    await deletePhotoQuery(photoId, entryId);

    //ELiminamos la foto
    await deletePhoto(photoId);

    //Enviamos respuesta al cliente
    res.send({
      status: 'ok',
      message: 'Foto eliminada con éxito',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteEntryPhoto;
