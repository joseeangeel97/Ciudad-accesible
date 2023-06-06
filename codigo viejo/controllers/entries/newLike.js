const selectEntryByIdQuery = require('../../db/queries/entries/selectEntryByIdQuery');
const insertLikeQuery = require('../../db/queries/entries/insertLikeQuery');

const newLike = async (req, res, next) => {
  try {
    // Obtenemos por destructuring el path param entryId.
    const { entryId } = req.params;

    const entry = await selectEntryByIdQuery(entryId, req.user.id);

    //Si somos los dueños no podemos dar like.
    if (entry.owner) {
      generateError('No puedes dar like a tu propia entrada', 403);
    }

    await insertLikeQuery(entryId, req.user.id);

    res.send({
      status: 'ok',
      message: 'Like agregado',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newLike;
