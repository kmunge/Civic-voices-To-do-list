import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCB5WujSymGcrvIfggbdm8Yy_o_PBJM0",
  authDomain: "civic-voices-todo.firebaseapp.com",
  projectId: "civic-voices-todo",
  storageBucket: "civic-voices-todo.appspot.com",
  messagingSenderId: "250080750123",
  appId: "1:250080750123:web:9364b07cd9d247ac27986e",
  measurementId: "G-FLR7J9Y42R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);