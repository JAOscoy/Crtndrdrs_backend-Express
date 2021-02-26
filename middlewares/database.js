import moongose from 'mongoose';

export default () => {
  moongose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function () {
      console.log('Conectado a la base de datos :)')
    })
    .catch(function () {
      console.error('No se puede establecer conexión con la BD');
      process.exit(1);
    });  
}