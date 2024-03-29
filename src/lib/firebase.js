// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getStorage, connectStorageEmulator } from "firebase/storage"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiPjxn2d2kfTHbm7-EojJsuuc0lLo0GSg",
  authDomain: "vibing-flamingo.firebaseapp.com",
  projectId: "vibing-flamingo",
  storageBucket: "vibing-flamingo.appspot.com",
  messagingSenderId: "358844936562",
  appId: "1:358844936562:web:ad581eaab5d142a7a2edeb",
  measurementId: "G-X8EY3N1BTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const functions = getFunctions(app, "europe-west1");
export const firestore = getFirestore(app);
export const storage = getStorage(app);

if (location.hostname === "localhost") {
   connectAuthEmulator(auth, "http://127.0.0.1:9099");
   connectFunctionsEmulator(functions, "127.0.0.1", 5001);
   connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
   connectStorageEmulator(storage, "127.0.0.1", 9199);
}
