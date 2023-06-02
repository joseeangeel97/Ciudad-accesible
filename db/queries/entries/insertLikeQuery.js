const getDB = require('../../getDB');

const { generateError } = require('../../../helpers');

const insertLikeQuery = async (entryId, userId) => {
  let connection;

  try {
    connection = await getDB();

    // Comprobamos si el usuario ya ha dado like al tweet.
    const [likes] = await connection.query(
      `SELECT id FROM likes WHERE entryId = ? AND userId = ?`,
      [entryId, userId]
    );

    if (likes.length > 0) {
      generateError('No puedes dar like dos veces a la misma entrada', 403);
    }

    await connection.query(
      `INSERT INTO likes(entryId, userId, createdAt) VALUES(?, ?, ?)`,
      [entryId, userId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertLikeQuery;
