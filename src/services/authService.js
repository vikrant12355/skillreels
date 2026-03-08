import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

/**
 * Register a new user with email and password
 * @param {string} email 
 * @param {string} password 
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Registration Error:", error.code, error.message);
    return { user: null, error: error.message };
  }
};

/**
 * Login an existing user
 * @param {string} email 
 * @param {string} password 
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Login Error:", error.code, error.message);
    return { user: null, error: error.message };
  }
};

/**
 * Logout the current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error("Logout Error:", error.message);
    return { error: error.message };
  }
};

/**
 * Listen for authentication state changes (persistence)
 * @param {function} callback 
 */
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
