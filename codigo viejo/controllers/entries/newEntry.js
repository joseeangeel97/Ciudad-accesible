const insertEntryQuery = require('../../db/queries/entries/insertEntryQuery');

const { generateError } = require('../../helpers');

const newEntry = async (req, res, next) => {
  try {
    const { title, city, neightborhood, district, description } = req.body;

    if (!title || !city || !neightborhood || !district || !description) {
      generateError('Faltan campos', 400);
    }

    const entry = await insertEntryQuery(
      req.user.id,
      title,
      city,
      neightborhood,
      district,
      description
    );
    
    const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Utilizamos el método values para obtener los valores de
            // la propiedad files, es decir, las fotos. Para evitar que el array de fotos
            // tenga más de tres fotos hacemos un slice y nos quedamos con las tres primeras.
            for (const photo of Object.values(req.files).slice(0, 3)) {
                // Guardamos la foto en el disco.
                const photoName = await savePhoto(photo, 500);

                // Insertamos la foto y obtenemos los datos de la misma.
                const newPhoto = await insertPhotoQuery(photoName, entry.id);

                // Pusheamos la foto al array de fotos.
                photos.push(newPhoto);
            }
        }

    res.send({
      status: 'ok',
      data: {
        entry,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEntry;
