// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCB5qWujSymGcrvIfggbdm8Yy_o_PBJM0",
  authDomain: "civic-voices-todo.firebaseapp.com",
  projectId: "civic-voices-todo",
  storageBucket: "civic-voices-todo.firebasestorage.app",
  messagingSenderId: "250080750123",
  appId: "1:250080750123:web:9364b07cd9d247ac27986e",
  measurementId: "G-FLR7J9Y42R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
