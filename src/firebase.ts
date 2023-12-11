// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAAEWgSllvc0RrjOMUWMWIQ12_im10Wol0",
  authDomain: "todoapp-6cbb6.firebaseapp.com",
  projectId: "todoapp-6cbb6",
  storageBucket: "todoapp-6cbb6.appspot.com",
  messagingSenderId: "28973681021",
  appId: "1:28973681021:web:97d86893989adc7e14a414",
  measurementId: "G-5QS1XW3VP1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
