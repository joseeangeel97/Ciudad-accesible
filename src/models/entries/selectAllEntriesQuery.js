const getDB = require('../../db/getDB');

const selectAllEntriesQuery = async (keyword = '', userId = 0) => {
  let connection;

  try {
    connection = await getDB();

    const [entries] = await connection.query(
      ` 
            SELECT
                E.id,
                E.title,
                E.city,
                E.district,
                E.description,
                E.neightborhood,
                E.resolved,
                U.username,
                E.userId,
                E.userId = ? AS owner,
                COUNT(L.id) AS likes,
                E.createdAt
            FROM entries E
            INNER JOIN users U ON U.id = E.userId
            LEFT JOIN likes L ON E.id = L.entryId      
            GROUP BY E.id
            ORDER BY E.createdAt DESC
        `,
      [userId]
    );

    // Si el array de entradas tiene alguna entrada obtenemos sus fotos y convertimos
    // a tipo Number la media de votos.
    for (const entry of entries) {
      const [photos] = await connection.query(
        `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
        [entry.id]
      );

      // Agregamos las fotos a la entrada.
      entry.photos = photos;

      // Convertimos a Number la media de votos.
      entry.votes = Number(entry.votes);
    }

    return entries;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllEntriesQuery;
