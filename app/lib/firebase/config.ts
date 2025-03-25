// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJuvRIxFkqGTrjs_imfxJQAAye2B_71xA",
  authDomain: "lynngistics.firebaseapp.com",
  projectId: "lynngistics",
  storageBucket: "lynngistics.firebasestorage.app",
  messagingSenderId: "847102685653",
  appId: "1:847102685653:web:11f6069f7a0aaccb918d5c"
};

// Initialize Firebase
let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0]; // if already initialized, use that one
}

// Initialize services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, db, auth, storage };
