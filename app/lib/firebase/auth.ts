import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential,
    NextOrObserver,
    Unsubscribe
  } from "firebase/auth";
  import { auth } from "./config";

  interface AuthResponse {
    user: User | null;
    error: Error | null;
  }

  interface LogoutResponse {
    error: Error | null;
  }

  // Sign up with email and password
  export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  };

  // Sign in with email and password
  export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  };

  // Sign out
  export const logOut = async (): Promise<LogoutResponse> => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Auth state observer
  export const subscribeToAuthChanges = (callback: NextOrObserver<User>): Unsubscribe => {
    return onAuthStateChanged(auth, callback);
  };
