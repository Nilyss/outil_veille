// types
import { User, UserCreationRequest } from "../API/models/User.model";
import { Dispatch, SetStateAction, ReactElement } from "react";

// hooks
import { Context, createContext, useState } from "react";
export interface IUserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  connectUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<User | null>;
  createUser: (user: UserCreationRequest) => Promise<void>;
}

// services
import UserService from "../API/services/User.service";
const userService: UserService = new UserService();

// init Context
export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  user: null,
  setUser: (): void => {},
  connectUser: async (): Promise<User> => {
    return {} as User;
  },
  createUser: async (): Promise<void> => {},
});

// Provider
export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);

  const connectUser = async (credentials: {
    email: string;
    password: string;
  }): Promise<User | null> => {
    const res: User = await userService.connectUser(credentials);
    setUser(res);
    //todo: states don't look good, sims to be not saved
    return user;
  };

  const createUser = async (user: UserCreationRequest): Promise<void> => {
    return await userService.createUser(user);
  };

  return (
    <UserContext.Provider value={{ connectUser, user, setUser, createUser }}>
      {children}
    </UserContext.Provider>
  );
};
