const deletePhotoQuery = require('../../db/queries/entries/deletePhotoQuery');
const selectEntryByIdQuery = require('../../db/queries/entries/selectEntryByIdQuery');
const checkPhotoExists = require('../../db/queries/entries/checkPhotoExists');
const { generateError, deletePhoto } = require('../../helpers');

const deleteEntryPhoto = async (req, res, next) => {
  try {
    const { entryId, photoId } = req.params;

    const entry = await selectEntryByIdQuery(entryId, req.user.id);

    if (!entry.owner) {
      generateError('No tienes suficientes permisos', 401);
    }

    // Verificar si la foto existe y está asociada a la entrada
    const photoExists = await checkPhotoExists(entryId, photoId);

    if (!photoExists) {
      generateError('Foto no encontrada', 404);
    }

    await deletePhotoQuery(photoId, entryId);

    await deletePhoto(photoId);

    res.send({
      status: 'ok',
      message: 'Foto eliminada con éxito',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteEntryPhoto;
