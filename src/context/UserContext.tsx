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
  }) => Promise<User>;
  createUser: (user: UserCreationRequest) => Promise<User>;
}

// services
import UserService from "../API/services/User.service";
const userService = new UserService();

// init Context
export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  connectUser: async (): Promise<User> => {
    return {} as User;
  },
  createUser: async (): Promise<User> => {
    return {} as User;
  },
});

// Provider
export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);

  const connectUser = async (credentials: {
    email: string;
    password: string;
  }): Promise<User> => {
    const user: User = await userService.connectUser(credentials);
    setUser(user);
    return user;
  };

  const createUser = async (user: UserCreationRequest): Promise<User> => {
    const newUser: User = await userService.createUser(user);
    setUser(newUser);
    return newUser;
  };

  return (
    <UserContext.Provider value={{ connectUser, user, setUser, createUser }}>
      {children}
    </UserContext.Provider>
  );
};
