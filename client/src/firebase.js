// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAk_DujxxzYpCQtZ9TRpBrJlpbxkGzzn5Y",
  authDomain: "videoapp-99895.firebaseapp.com",
  projectId: "videoapp-99895",
  storageBucket: "videoapp-99895.appspot.com",
  messagingSenderId: "65810745006",
  appId: "1:65810745006:web:0f03f53c93f0b257ae4f3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app