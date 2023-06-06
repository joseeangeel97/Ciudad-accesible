const getDB = require('../../db/getDB');

const { generateError } = require('../../services/helpers');

const selectEntryByIdQuery = async (entryId, userId = 0) => {
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
                    E.status,
                    U.username,
                    E.userId,
                    E.userId = ? AS owner,
                    COUNT(L.id) AS likes,
                    E.createdAt
                FROM entries E
                INNER JOIN users U ON U.id = E.userId
                LEFT JOIN likes L ON E.id = L.entryId
                WHERE E.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
      [userId, entryId]
    );

    // En la linea 23 mostramos cuantos likes tiene la entrada.

    // Si no hay entradas lanzamos un error.
    if (entries.length < 1) {
      generateError('Entrada no encontrada', 404);
    }

    // Llegados a este punto sabemos que existe una entrada y que está en la
    // posición 0 del array. Vamos a obtener las fotos de dicha entrada (si tiene).
    const [photos] = await connection.query(
      `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
      [entries[0].id]
    );

    // Devolvemos los datos de la entrada junto a sus fotos.
    return {
      ...entries[0],
      photos,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectEntryByIdQuery;
