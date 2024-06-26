import Cookies from "js-cookie";
import { User, UserCreationRequest } from "../models/User.model";
import { APICalls, APIResponse } from "../APICalls";

const apiCalls: APICalls = new APICalls();

interface IUserService {
  createUserEndpoint: string;
  connectUserEndpoint: string;
  connectUser(credentials: { email: string; password: string }): Promise<User>;
  createUser(user: UserCreationRequest): Promise<void>;
}

export default class UserService implements IUserService {
  connectUserEndpoint: string = "/auth/login";
  createUserEndpoint: string = "/users/create";

  async connectUser(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const res: APIResponse<User> = await apiCalls.postRequest(
        this.connectUserEndpoint,
        credentials,
      );
      const cookies: string[] | null =
        res.headers.get("set-cookie")?.split(", ") || null;
      if (cookies) {
        cookies.forEach((cookie: string): void => {
          const cookieNameValue: string = cookie.split(";")[0];
          const [cookieName, cookieValue]: string[] =
            cookieNameValue.split("=");
          Cookies.set(cookieName, cookieValue);
        });
      }
      return res.data as User;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createUser(user: UserCreationRequest): Promise<void> {
    try {
      await apiCalls.postRequest(this.createUserEndpoint, user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
