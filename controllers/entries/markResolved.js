const markAccessibilityResolvedQuery = require('../../db/queries/entries/markAccessibilityResolvedQuery');
const selectEntryByIdQuery = require('../../db/queries/entries/selectEntryByIdQuery');
const { generateError } = require('../../helpers');

const markResolved = async (req, res, next) => {
  try {
    const { entryId } = req.params;

    const entry = await selectEntryByIdQuery(entryId, req.user.id);

    if (!entry.owner) {
      generateError('No tienes suficientes permisos', 401);
    }

    await markAccessibilityResolvedQuery(entryId);

    res.send({
      status: 'ok',
      message: 'Problema de accesibilidad marcado como resuelto',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = markResolved;
