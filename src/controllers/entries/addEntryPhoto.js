const insertPhotoQuery = require('../../models/entries/insertPhotoQuery');
const selectEntryByIdQuery = require('../../models/entries/selectEntryByIdQuery');

const { generateError, savePhoto } = require('../../services/helpers');

const addEntryPhoto = async (req, res, next) => {
  try {
    const { entryId } = req.params;

    if (!req.files?.photo) {
      generateError('Faltan campos', 400);
    }

    const entry = await selectEntryByIdQuery(entryId, req.user.id);

    if (!entry.owner) {
      generateError('No tienes suficientes permisos', 401);
    }

    if (entry.photos.length > 2) {
      generateError('Límite de tres fotos alcanzado', 403);
    }

    const photoName = await savePhoto(req.files.photo, 500);

    const photo = await insertPhotoQuery(photoName, entryId, req.user.id);

    res.send({
      status: 'ok',
      data: {
        photo: {
          ...photo,
          entryId: Number(entryId),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addEntryPhoto;
