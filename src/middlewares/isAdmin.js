const getDB = require('../db/getDB');

const { generateError } = require('../services/helpers');

const isAdmin = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT role FROM users WHERE id = ?`,
      [req.user.id]
    );

    // Lanzamos un error si el usuario no es administrador.
    if (users[0].role !== 'admin') {
      generateError('No tienes suficientes permisos', 401);
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = isAdmin;
