const insertUserQuery = require('../../models/users/insertUserQuery');

const newUserSchema = require('../../schemas/newUserSchema');

const { generateError, validateSchema } = require('../../services/helpers');

const newUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // JOI
    await validateSchema(newUserSchema, req.body);

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
