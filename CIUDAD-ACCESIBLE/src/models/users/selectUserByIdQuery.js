const getDB = require('../../db/getDB');

const selectUserByIdQuery = async (userId) => {
  let connection;

  try {
    connection = await getDB();

    // Localizamos al usuario con el id que venga como argumento.
    const [users] = await connection.query(
      `SELECT id, email, username,  role, createdAt FROM users WHERE id = ?`,
      [userId]
    );

    // Dado que no puede existir más de un usuario con el mismo id, en caso de que en el
    // array de usuarios haya un usuario estará en la posición 0.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
