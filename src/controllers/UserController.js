import User from '../models/User';
import UserService from '../services/UserService';
import Controller from './Controller';

const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new UserController(userService);
