// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt42dDzK32bQOFfoLxuz6QnLYAkoJfR4M",
  authDomain: "postoffice-01.firebaseapp.com",
  projectId: "postoffice-01",
  storageBucket: "postoffice-01.firebasestorage.app",
  messagingSenderId: "742534297730",
  appId: "1:742534297730:web:8c6c9f243cf2c1bd881c9b",
  measurementId: "G-E7QNW1MP7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
export {db};