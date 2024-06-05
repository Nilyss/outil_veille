export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface UserCreationRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
