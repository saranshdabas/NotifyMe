import UserController from '../controllers/UserController';

export default (server) => {
  //USER routes
  server.get('/api/user', UserController.getAll);
  server.post('/api/user', UserController.insert);
  server.put('/api/post/:id', UserController.update);
  server.delete('/api/post/:id', UserController.delete);
};
