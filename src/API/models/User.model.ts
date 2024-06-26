export interface User {
  id: string;
  email: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserCreationRequest {
  email: string;
  password: string;
}
