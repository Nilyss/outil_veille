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

interface APIUserResponse {
  user: User;
}

export default class UserService implements IUserService {
  connectUserEndpoint: string = "/auth/login";
  createUserEndpoint: string = "/users/create";

  async connectUser(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const res: APIResponse<APIUserResponse> = await apiCalls.postRequest(
        this.connectUserEndpoint,
        credentials,
      );

      const cookies: string[] | null =
        res.headers.get("set-cookie")?.split(", ") || null;

      if (cookies) {
        cookies.forEach((cookie: string): void => {
          const [cookieNameValue, ...cookieAttributes] = cookie.split("; ");
          const [cookieName, cookieValue]: string[] =
            cookieNameValue.split("=");

          const options: Cookies.CookieAttributes = {};
          cookieAttributes.forEach((attr) => {
            const [key, value] = attr.split("=");
            if (key.toLowerCase() === "samesite") {
              options.sameSite = value as "strict" | "lax" | "none";
            } else if (key.toLowerCase() === "httponly") {
              options.httpOnly = true;
            } else if (key.toLowerCase() === "secure") {
              options.secure = true;
            } else if (key.toLowerCase() === "max-age") {
              options.maxAge = parseInt(value, 10);
            }
          });

          if (!options.sameSite) {
            options.sameSite = "None";
            options.secure = true;
          }

          Cookies.set(cookieName, cookieValue, options);
        });
      }

      return res.data.user;
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
