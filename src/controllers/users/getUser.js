const selectUserByIdQuery = require('../../models/users/selectUserByIdQuery');

const { generateError } = require('../../services/helpers');

const getUser = async (req, res, next) => {
  try {
    const user = await selectUserByIdQuery(req.user.id);

    // Eliminamos el email ya que es privado y no se debe saber.
    delete user.email;

    res.send({
      status: 'ok',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
