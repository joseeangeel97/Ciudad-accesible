# Ciudad más accesible

Este programa consiste en una API para conseguir una ciudad más accesible, donde indicamos los posibles problemas que encontremos de accesibilidad en la ciudad y así poder resolverlos y hacer una ciudad para todos los ciudadanos.

## Instalar

- Crear una base de datos vacía en una instancia de MySQL local.

- Instalar las dependencias mediante el comando `npm install` o `npm i`.

- Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

- Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos anteriormente creada.

- Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Base de datos

- User:

  - id
  - email
  - username
  - password
  - role ("admin", "normal")
  - createdAt
  - modifiedAt

- Entries

  - id
  - title
  - city
  - neightborhood
  - district
  - description
  - userId
  - status
  - createdAt
  - modifiedAt

- EntryPhotos

  - id
  - name 
  - entryId
  - createdAt
  - modifiedAt

- Likes: (opcional)

  - id
  - userId
  - entryId
  - createdAt
  - modifiedAt

### Endpoints Usuarios:

- POST [/users] - Registro de usuario. ✅
- POST [/users/login] - Login de usuario (devuelve token). ✅
- GET [/users] - Devuelve información del usuario del token. **TOKEN** ✅
- PUT [/users] - Editar el email o el nombre de usuario. **TOKEN** ✅ (opcional)

### Endpoints Entries

-POST [/entries] - Crea una entrada (solo admin TIENE token)
-GET [/entries] - Retorna el listado de entradas (opcional añadir algún tipo de filtros)
-GET [/entries/:entryId] - Retorna una entrada en concreto
-POST [/entries/:entryId/likes] - Likea una entrada (token)
-DELETE [/entries/:entryId/likes] -Deslikea una entrada (token)
-POST [entries/:entryId/photos] - Agregar una foto a una entrada (token) (opcional)
-DELETE [/entries/:entryId/photos] -Borra una foto de una entrada (token)
-PUT [/entries/:entryId/resolves] - Marca un problema de accesibilidad como resuelto
