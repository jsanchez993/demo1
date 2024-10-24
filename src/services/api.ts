import { LoginCredentials, AuthResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/v1/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'username': credentials.email,
      'password': credentials.password
    })
  });
console.log(response)
  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const logoutUser = async (token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/v1/logout/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};