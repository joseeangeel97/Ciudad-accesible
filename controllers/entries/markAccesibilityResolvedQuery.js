const getDB = require('../../getDB');

const markAccessibilityResolvedQuery = async (entryId) => {
  const db = await getDB();
  try {
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

module.exports = markAccessibilityResolvedQuery;
