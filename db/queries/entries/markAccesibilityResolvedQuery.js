const getDB = require('../../getDB');

//Función para marcar problema de accesibilidad
const markAccesibilityResolvedQuery = async (entryId) => {
  const db = await getDB();
  try {
    //Actualizamos tabla, columna acc_resolved como true en la fila donde id coincide con entryId
    await db.query(
      'UPDATE entries SET accessibility_resolved = true WHERE id = ?',
      [entryId]
    );
  } catch (error) {
    throw new Error(
      'Error al marcar el problema de accesibilidad como resuelto'
    );
  } finally {
    db.release();
  }
};

module.exports = markAccesibilityResolvedQuery;
