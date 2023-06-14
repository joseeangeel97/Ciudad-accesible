const insertEntryQuery = require('../../models/entries/insertEntryQuery');

const { generateError } = require('../../services/helpers');

const newEntry = async (req, res, next) => {
  try {
    const { title, city, neightborhood, district, description } = req.body;

    if (!title || !city || !neightborhood || !district || !description) {
      generateError('Faltan campos', 400);
    }

    const entry = await insertEntryQuery(
      req.user.id,
      title,
      city,
      neightborhood,
      district,
      description
    );

    res.send({
      status: 'ok',
      data: {
        entry,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEntry;
