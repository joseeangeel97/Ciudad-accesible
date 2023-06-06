const getDB = require('../../db/getDB');

//Insertamos una nueva foto en la base de datos

const insertPhotoQuery = async (photoName, entryId, userId) => {
  //Almacenamos conexion db
  let connection;

  try {
    connection = await getDB();

    const createdAt = new Date();

    const [photo] = await connection.query(
      `INSERT INTO entryPhotos(name, entryId, createdAt,userId) VALUES(?, ?, ?,?)`,
      [photoName, entryId, createdAt, userId]
    );
    //Objeto con id de la foto y nombre
    return {
      id: photo.insertId,
      name: photoName,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoQuery;
