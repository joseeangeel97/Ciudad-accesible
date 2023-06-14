const getDB = require('../../db/getDB');

//Función para marcar problema de accesibilidad
const markAccesibilityResolvedQuery = async (entryId) => {
  let db;

  try {
    db = await getDB();

    //Actualizamos tabla, columna acc_resolved como true en la fila donde id coincide con entryId
    await db.query('UPDATE entries SET resolved = true WHERE id = ?', [
      entryId,
    ]);
  } finally {
    db.release();
  }
};

module.exports = markAccesibilityResolvedQuery;
