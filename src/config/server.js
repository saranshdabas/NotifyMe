import express from 'express';
import bodyParser from 'body-parser';
import setRoutes from './routes';

const server = express();
server.use(bodyParser.json());
setRoutes(server);
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

export default server;
