export interface LoginPayload {
  username: string;
  password: string;
  new_password?: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface UserCreationPayload {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  password: string;
}

export interface GetUsersPayload {
  count: number | null;
  next: null | number;
  previous: null | number;
  results: Result[];
}

export interface Result {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface LoggedUser {
  refresh: string;
  access: string;
  user: User;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  has_default_password: boolean;
}
