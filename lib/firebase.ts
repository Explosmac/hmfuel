// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmFVUboMmJFU_gKwprLESn-3OgaIoST_w",
  authDomain: "hmfuel-242a0.firebaseapp.com",
  projectId: "hmfuel-242a0",
  storageBucket: "hmfuel-242a0.appspot.com",
  messagingSenderId: "57242841890",
  appId: "1:57242841890:web:fbceddfb10e6d3ded2ab7b",
  measurementId: "G-KZ75W3301R"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
