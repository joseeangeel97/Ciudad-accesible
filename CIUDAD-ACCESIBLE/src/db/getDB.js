const mysql = require('mysql2/promise');

// Obtenemos las variables de entorno necesarias.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará un "array" de conexiones.
let pool;

// Función que retorna una conexión libre con la base de datos.
const getDB = async () => {
  try {
    // Si la variable "pool" es undefined creamos un grupo de conexiones.
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: 'Z',
      });
    }

    // Retornamos una conexión libre con la base de datos.
    return await pool.getConnection();
  } catch (err) {
    console.error(err);
  }
};

// Exportamos la función anterior.
module.exports = getDB;
