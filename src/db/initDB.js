require('dotenv').config();

const bcrypt = require('bcrypt');

const getDB = require('./getDB');

const main = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log('Borrando tablas...');

    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS entryPhotos');
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
            createdAt DATETIME NOT NULL

        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS entries (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(30) NOT NULL,
            city VARCHAR(60) NOT NULL,
            district VARCHAR(30) NOT NULL,
            neightborhood VARCHAR(60) NOT NULL,                
            description TEXT NOT NULL,
            userId INT UNSIGNED NOT NULL,
            resolved BOOLEAN,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS entryPhotos (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            userId INT UNSIGNED NOT NULL,
            name VARCHAR(100) NOT NULL,
            entryId INT UNSIGNED NOT NULL,
            createdAt DATETIME NOT NULL,
            FOREIGN KEY (entryId) REFERENCES entries(id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            userId INT UNSIGNED NOT NULL,
            entryId INT UNSIGNED NOT NULL,
            createdAt DATETIME NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (entryId) REFERENCES entries(id)
        )
    `);

    console.log('¡Tablas creadas!');

    //Encriptamos contraseña administrador

    const hashedPass = await bcrypt.hash('123456', 10);

    await connection.query(
      `INSERT INTO users (email, username, password,role,  createdAt) VALUES ('admin@gmail.com', 'admin', '${hashedPass}', 'admin', ?)`,
      [new Date()]
    );
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

//Llamamos a la función anterior
main();
