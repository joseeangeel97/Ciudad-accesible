const getDB = require('../../db/getDB');

const insertEntryQuery = async (
  userId,
  title,
  city,
  neightborhood,
  district,
  description
) => {
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    // Insertamos la entrada.
    const [entry] = await connection.query(
      `INSERT INTO entries(userId,title, city, neightborhood, district,description, createdAt) VALUES(?,?,?, ?, ?, ?, ?)`,
      [userId, title, city, neightborhood, district, description, createdAt]
    );

    // Retornamos la entrada.
    return {
      id: entry.insertId,
      userId,
      title,
      city,
      neightborhood,
      district,
      description,
      createdAt,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertEntryQuery;
