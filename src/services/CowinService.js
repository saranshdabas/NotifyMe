import UserService from '../services/UserService';
import User from '../models/User';

const userService = new UserService(new User().getInstanceWithoutInit());
class CowinService {
  constructor() {
    this.users = [];
    this.refreshUsers();
  }

  async refreshUsers() {
    const response = await userService.getAll({});
    if (response.error) {
      //Problem - try again after some time
      await new Promise((resolve) => setTimeout(resolve, 60000));
      await this.refreshUsers();
    } else {
      this.users = response.data;
      console.log(this.users);
      await new Promise((resolve) => setTimeout(resolve, 60000));
      await this.refreshUsers();
    }
  }

  async getDataForEachUser() {
    //Call cowin apis
  }
}

export default new CowinService();
