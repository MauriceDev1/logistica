'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authFunctions } from '@/app/lib/firebase';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>;
  logOut: () => Promise<{ error: Error | null }>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create a typed context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = authFunctions.subscribeToAuthChanges((authUser: User | null) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signUp: authFunctions.signUp,
    signIn: authFunctions.signIn,
    logOut: authFunctions.logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
