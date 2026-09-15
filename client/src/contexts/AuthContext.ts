import { createContext, useContext } from 'react';

export interface AuthUser {
  clientPrincipal?: {
    userDetails?: string;
  };
}

export const AuthContext = createContext<AuthUser>({});

export function useAuth(): AuthUser {
  return useContext(AuthContext);
}
