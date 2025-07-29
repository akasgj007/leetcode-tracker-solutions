// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6K0PlS8IcjFeUXaHM0Q7QUXopL_4KQcY",
  authDomain: "ak-leetcode-tracker-react.firebaseapp.com",
  projectId: "ak-leetcode-tracker-react",
  storageBucket: "ak-leetcode-tracker-react.firebasestorage.app",
  messagingSenderId: "1062888904087",
  appId: "1:1062888904087:web:948f43f17380c9f49ba0d2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
