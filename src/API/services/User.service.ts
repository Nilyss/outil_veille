import { User, UserCreationRequest } from "../models/User.model";
import { APICalls } from "../APICalls";

const apiCalls: APICalls = new APICalls();

interface IUserService {
  userEndpoint: string;
  getUser(id: string): Promise<User>;
  createUser(user: UserCreationRequest): Promise<User>;
}

export default class UserService implements IUserService {
  userEndpoint: string = "/users";

  async getUser(id: string): Promise<User> {
    try {
      return <User>(
        await apiCalls.getRequest<User>(`${this.userEndpoint}/${id}`)
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createUser(user: UserCreationRequest): Promise<User> {
    try {
      return <User>await apiCalls.postRequest<User>(this.userEndpoint, user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
