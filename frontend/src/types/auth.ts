export interface AuthUser {
  username: string;
  name: string;
  email: string;
  apps: string[];
}

export interface AuthToken {
  user: AuthUser;
  exp: number; // Expiry timestamp in milliseconds
  iat: number; // Issued at timestamp in milliseconds
  iss: string; // Issuer
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
}
