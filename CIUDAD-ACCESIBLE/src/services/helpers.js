//Importamos módulo fs
const fs = require('fs/promises');

//Importamos path
const path = require('path');

//Importamos sharp para las imágenes
const sharp = require('sharp');

//Importamos uuid para generar nombre único
const { v4: uuid } = require('uuid');

/**
 * ###################
 * ##   Funciones   ##
 * ###################
 */

//Generate Error
const generateError = (msg, status) => {
  const err = new Error(msg);
  err.httpStatus = status;
  throw err;
};

//Save Photo
const savePhoto = async (img, width) => {
  try {
    // Creamos la ruta absoluta al directorio de subida de archivos.
    const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

    try {
      // Intentamos acceder al directorio de subida de archivos mediante el
      // método "access". Este método genera un error si no es posible acceder
      // al directorio o archivo.
      await fs.access(uploadsPath);
    } catch {
      // Si salta un error quiere decir que el directorio no existe así que lo creamos.
      await fs.mkdir(uploadsPath);
    }

    // Convertimos la imagen en un objeto Sharp para poder redimensionarla.
    const sharpImg = sharp(img.data);

    // Redimensionamos la imagen. Width sería un ancho en píxeles.
    sharpImg.resize(width);

    // Generamos un nombre único para la imagen.
    const imgName = `${uuid()}.jpg`;

    // Generamos la ruta absoluta a la imagen.
    const imgPath = path.join(uploadsPath, imgName);

    // Guardamos la imagen.
    await sharpImg.toFile(imgPath);

    // Retornamos el nombre con el que hemos guardado la imagen.
    return imgName;
  } catch (err) {
    console.error(err);
    generateError('Error al guardar la imagen en disco');
  }
};

//Delete Photo

const deletePhoto = async (imgName) => {
  try {
    // Creamos la ruta absoluta al archivo que queremos eliminar.
    const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);

    try {
      // Intentamos acceder a la imagen mediante el método "access". Este
      // método genera un error si no es posible acceder al archivo.
      await fs.access(imgPath);
    } catch {
      // Si salta un error quiere decir que el archivo no existe así que
      // finalizamos la función.
      return;
    }

    // Eliminamos el archivo del disco.
    await fs.unlink(imgPath);
  } catch (err) {
    console.error(err);
    generateError('Error al eliminar la imagen del servidor', 500);
  }
};

const validateSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
  } catch (err) {
    err.httpStatus = 400;
    throw err;
  }
};

module.exports = {
  generateError,
  savePhoto,
  deletePhoto,
  validateSchema,
};
