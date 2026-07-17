import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDmsAFVX-u4Mp_N_HVYO-62BLulWTKbpSE",
  authDomain: "codesprint-5e127.firebaseapp.com",
  projectId: "codesprint-5e127",
  storageBucket: "codesprint-5e127.firebasestorage.app",
  messagingSenderId: "835581722113",
  appId: "1:835581722113:web:56041494793524a8d78a00",
  measurementId: "G-XRVPCW696J"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Safe Analytics initialization for SSR
export const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;
