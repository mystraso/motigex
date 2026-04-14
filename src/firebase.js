import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxvK0XH5gCEC8wKacW0R7bc8VRpH4_qMc",
  authDomain: "motigex.firebaseapp.com",
  databaseURL: "https://motigex-default-rtdb.firebaseio.com",
  projectId: "motigex",
  storageBucket: "motigex.firebasestorage.app",
  messagingSenderId: "825472456333",
  appId: "1:825472456333:web:a466e96f46e4960b51b4c4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
