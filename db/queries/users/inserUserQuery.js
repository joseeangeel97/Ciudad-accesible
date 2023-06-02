const getDB = require('../getDB');

const bcrypt = require('bcrypt');

const { generateError } = require('../../helpers');

const insertUserQuery = async (email, username, password) => {
  let connection;

  try {
    connection = await getDB();

    // Buscamos en la base de datos algún usuario ese email.
    let [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0) {
      generateError('Ya existe un usuario con ese email', 403);
    }

    // Buscamos en la base de datos algún usuario ese nombre de usuario.
    [users] = await connection.query(
      `SELECT id FROM users WHERE username = ?`,
      [username]
    );

    // Si existe algún usuario con ese nombre de usuario lanzamos un error.
    if (users.length > 0) {
      generateError('Ya existe un usuario con ese nombre de usuario', 403);
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Creamos el usuario en la base de datos.
    await connection.query(
      `INSERT INTO users (email, username, password, createdAt) VALUES (?, ?, ?, ?)`,
      [email, username, hashedPass, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
