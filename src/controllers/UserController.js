import User from '../models/User';
import UserService from '../services/UserService';

const userService = new UserService(new User().getInstance());

class UserController {
  constructor(service) {
    super(service);
  }
}

export default new UserController(userService);
