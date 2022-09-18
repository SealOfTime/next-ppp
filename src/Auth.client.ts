import React, { useContext } from 'react';

export type Session = {
    vkUserId: string;
    firstName: string;
    lastName: string;
}

type ContextValue = {
  session?: Session
  setSession: (s?: Session)=>void
}

const AuthContext = React.createContext<ContextValue>(undefined);

export const useAuth = (): ContextValue => {
  const a = useContext(AuthContext);
  return a;
};

export const AuthProvider = AuthContext.Provider;
