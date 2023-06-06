const { generateError } = require('../../helpers');

//Importamos para marcar problema accesibilidad
const markAccesibilityResolvedQuery = require('../../db/queries/entries/markAccesibilityResolvedQuery');
//Importamos para obtener entrada concreta por su id
const selectEntryByIdQuery = require('../../db/queries/entries/selectEntryByIdQuery');

//
const markResolved = async (req, res, next) => {
  try {
    //Obtenemos id entrada de los params de la solicitud
    const { entryId } = req.params;

    //Obtener entrada concreta con id proporcionado e id usuario actual
    const entry = await selectEntryByIdQuery(entryId, req.user.id);

    //Verificamos si el usuario actual es propietario de entrada
    if (!entry.owner) {
      generateError('No tienes suficientes permisos', 401);
    }

    //Marcamos problema acce como resuelto en la entrada concreta
    await markAccesibilityResolvedQuery(entryId);

    res.send({
      status: 'ok',
      message: 'Problema de accesibilidad marcado como resuelto',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = markResolved;
