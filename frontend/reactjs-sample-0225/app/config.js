// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth,setPersistence,browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzU1XrUmI1UYh_tEGvxXncUZQu4ccyE4E",
  authDomain: "reactjs-sample-0225.firebaseapp.com",
  projectId: "reactjs-sample-0225",
  storageBucket: "reactjs-sample-0225.firebasestorage.app",
  messagingSenderId: "69248617505",
  appId: "1:69248617505:web:c2d5aac5575685fd782760",
  measurementId: "G-WWX0F53VG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
await setPersistence(auth, browserLocalPersistence);
export const db = getFirestore(app);
// export{firebase};
const analytics = getAnalytics(app);