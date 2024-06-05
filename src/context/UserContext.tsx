// types
import { User, UserCreationRequest } from "../API/models/User.model";
import { Dispatch, SetStateAction, ReactElement } from "react";

// hooks
import { Context, createContext, useState } from "react";
export interface IUserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  getUser: (id: string) => Promise<User>;
  createUser: (user: UserCreationRequest) => Promise<User>;
}

// services
import UserService from "../API/services/User.service";
const userService = new UserService();

// init Context
export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  getUser: async (): Promise<User> => {
    return {} as User;
  },
  createUser: async (): Promise<User> => {
    return {} as User;
  },
});

// Provider
export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async (id: string): Promise<User> => {
    const user: User = await userService.getUser(id);
    setUser(user);
    return user;
  };

  const createUser = async (user: UserCreationRequest): Promise<User> => {
    const newUser: User = await userService.createUser(user);
    setUser(newUser);
    return newUser;
  };

  return (
    <UserContext.Provider value={{ getUser, user, setUser, createUser }}>
      {children}
    </UserContext.Provider>
  );
};
