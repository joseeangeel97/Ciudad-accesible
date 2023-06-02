const getDB = require('../../getDB');

const checkPhotoExists = async (entryId, photoId) => {
  const db = await getDB();
  try {
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
