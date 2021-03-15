// Create connection with the mongo database

const { connect , set } = require('mongoose');

let isProduction = process.env.NODE_ENV === 'production';

module.exports = async () => {
  await connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(function () {
      console.log('Conectado a la base de datos')
    })
    .catch(function () {
      console.error('No se puede establecer conexión con la BD');
      process.exit(1);
    })
}
