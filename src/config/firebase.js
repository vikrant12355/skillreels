// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

import { Platform } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Platform.select({
    android: "AIzaSyBweeDHmWcDQatBrc-dGYm_oXjXVX_I8Mg",
    default: "AIzaSyA01DvItA03YpQpC3XK0u9ZPIJsFA1pisU"
  }),
  authDomain: "skillreels1.firebaseapp.com",
  projectId: "skillreels1",
  storageBucket: "skillreels1.firebasestorage.app",
  messagingSenderId: "34379440602",
  appId: Platform.select({
    android: "1:34379440602:android:6ca38799563ff20f45a0e3",
    default: "1:34379440602:web:12ecbc9e0f2653a345a0e3"
  }),
  measurementId: "G-0JEWMWNMMN"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Handle analytics (Async check since it may not be supported in some environments/simulators)
export const analytics = isSupported().then((supported) => supported ? getAnalytics(app) : null);

export default app;
