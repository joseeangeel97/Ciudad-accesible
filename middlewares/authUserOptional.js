const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const authUserOptional = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization && authorization !== 'null') {
      // Aquí almacenamos el token desencriptado.
      let tokenInfo;

      try {
        tokenInfo = jwt.verify(authorization, process.env.SECRET);
      } catch {
        generateError('Token inválido', 401);
      }

      req.user = tokenInfo;
    }

    // mandamos el control a la siguiente función
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUserOptional;
