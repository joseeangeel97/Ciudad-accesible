const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const deleteLikeQuery = async (entryId, userId) => {
  let connection;

  try {
    connection = await getDB();

    // Comprobamos si el usuario ya ha dado like a la entrada.
    const [likes] = await connection.query(
      `SELECT id FROM likes WHERE entrytId = ? AND userId = ?`,
      [entryId, userId]
    );

    if (likes.length < 1) {
      generateError('Like no encontrado', 404);
    }

    await connection.query(
      `DELETE FROM likes WHERE entryId = ? AND userId = ?`,
      [entryId, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteLikeQuery;
