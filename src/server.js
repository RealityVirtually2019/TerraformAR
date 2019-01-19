
import express from 'express';

const LISTEN_PORT = process.env.PORT;

const server = express();


Promise.resolve()
  .then(async function() {

    server.use('/static', express.static('static'));
    server.use(express.static('./dist'));
    server.use('/dist', express.static('./dist'));

    server.listen(LISTEN_PORT, () => console.log('TerraformAR server listening on port:' + LISTEN_PORT));

  })