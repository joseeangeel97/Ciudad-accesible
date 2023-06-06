const deleteLikeQuery = require('../../models/entries/deleteLikeQuery');

const deleteLike = async (req, res, next) => {
  try {
    // Obtenemos por destructuring el path param tweetId.
    const { entryId } = req.params;

    await deleteLikeQuery(entryId, req.user.id);

    res.send({
      status: 'ok',
      message: 'Like eliminado',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteLike;
