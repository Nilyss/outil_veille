import { User, UserCreationRequest } from "../models/User.model";
import { APICalls } from "../APICalls";

const apiCalls: APICalls = new APICalls();

interface IUserService {
  userEndpoint: string;
  connectUser(credentials: { email: string; password: string }): Promise<User>;
  createUser(user: UserCreationRequest): Promise<User>;
}

export default class UserService implements IUserService {
  userEndpoint: string = "/users";

  async connectUser(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    console.log("credentials req.body —>", credentials);
    try {
      const res = await apiCalls.getToken(credentials);
      console.log("getTokenResponse —>", res);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createUser(user: UserCreationRequest): Promise<User> {
    try {
      console.log("CreateUser req.body —>", user);
      return <User>await apiCalls.postRequest<User>(this.userEndpoint, user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
