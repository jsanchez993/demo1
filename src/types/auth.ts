export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  first_name: string;
  last_name: string;
}

export interface User {
  first_name: string;
  last_name: string;
}