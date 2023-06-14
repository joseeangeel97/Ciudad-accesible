const joi = require('joi');

const newUserSchema = joi.object().keys({
  email: joi
    .string()
    .required()
    .email()
    .error((errors) => {
      if (errors[0].code === 'any.required') {
        return new Error('Ha de escribir un email');
      }
    }),
  username: joi.string().required(),
  password: joi
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/m)
    .error((errors) => {
      switch (errors[0].code) {
        case 'string.pattern.base':
          return new Error(
            'La contraseña ha de tener al menos 1 letra mayuscula, 1 miniscula, 1 numero y 1 caracter especial'
          );
        default:
          return new Error('La contraseña debe ser entre 8 y 100 caracteres');
      }
    }),
});

module.exports = newUserSchema;
