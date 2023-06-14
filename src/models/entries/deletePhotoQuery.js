//## Creo deletePhotoQuery.js ##

const getDB = require('../../db/getDB');

//Mandamos el id de la foto que queremos borrar(photoId)
const deletePhotoQuery = async (photoId) => {
  let connection;

  try {
    connection = await getDB();

    //Con tener el id de la foto es suficiente
    await connection.query(`DELETE FROM entryPhotos WHERE id = ?`, [photoId]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePhotoQuery;
