const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');

const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await selectUserByIdQuery(userId);

    if (!user) {
      generateError('Usuario no encontrado', 404);
    }

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
