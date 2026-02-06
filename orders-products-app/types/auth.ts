export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  name: string;
}

export interface AuthApiResponse {
  token: string;
  user: User;
}

export interface MeApiResponse {
  user: User;
}
