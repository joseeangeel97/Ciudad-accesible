const getDB = require('../../getDB');

//Función para verificar que existe  una foto en una entrada concreta

const checkPhotoExists = async (entryId, photoId) => {
  const db = await getDB();
  try {
    //Buscamos una fila en la tabla photos donde el id de la foto coincida con photoId
    //y el de la entrada con entryId
    const [result] = await db.query(
      'SELECT id FROM photos WHERE id = ? AND entry_id = ?',
      [photoId, entryId]
    );
    return result.length > 0;
  } catch (error) {
    throw new Error('Error al verificar la existencia de la foto');
  } finally {
    db.release();
  }
};

module.exports = checkPhotoExists;
