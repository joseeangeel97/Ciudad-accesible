const insertUserQuery = require('../../db/queries/inserUserQuery');

const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // Si falta algún campo lanzamos un error.
    if (!email || !username || !password) {
      generateError('Faltan campos', 400);
    }

    await insertUserQuery(email, username, password);

    res.send({
      status: 'ok',
      message: 'Usuario creado',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;