require('dotenv').config();
//.config es el método que se encarga de buscar el fichero .env  y poner las variables de env en las variables de entorno

const getDB = require('./getDB.js');

const main = async () => {
  let connection;
  let code = 0;

  try {
    connection = await getDB();

    console.log('Borrando tablas...');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS entryphotos');
    await connection.query('DROP TABLE IF EXISTS entries');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas...');

    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                created_At DATETIME NOT NULL,
                modified_At DATETIME
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS entries (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(30) NOT NULL,
                city VARCHAR(60) NOT NULL,
                district VARCHAR(30) NOT NULL,
                description TEXT NOT NULL,
                userId INT UNSIGNED NOT NULL,
                status BOOLEAN,
                created_At DATETIME NOT NULL,
                modified_At DATETIME,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS entryPhotos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                entryId INT UNSIGNED NOT NULL,
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME,
                FOREIGN KEY (entryId) REFERENCES entries(id)
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS entryVotes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                user_Id INT UNSIGNED NOT NULL,
                entry_Id INT UNSIGNED NOT NULL,
                created_At DATETIME NOT NULL,
                modified_At DATETIME,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (entryId) REFERENCES entries(id)
            )
        `);

    console.log('¡Tablas creadas!');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

//Llamamos a la función anterior
main();
