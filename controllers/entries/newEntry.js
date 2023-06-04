const insertEntryQuery = require('../../db/queries/entries/insertEntryQuery');

const { generateError } = require('../../helpers');

const newEntry = async (req, res, next) => {
  try {
    const { id, title, city, neightborhood, district } = req.body;

    if (!id || !title || !city || !neightborhood || !district) {
      generateError('Faltan campos', 400);
    }

    const entry = await insertEntryQuery(
      id,
      title,
      city,
      neightborhood,
      district
    );

    res.send({
      status: 'ok',
      data: {
        entry: {
          ...entry,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEntry;
