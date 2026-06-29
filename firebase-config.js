// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkaZed281yilHvPwlmIU67tmFjVe9U8hk",
  authDomain: "pr-workout-tracker.firebaseapp.com",
  projectId: "pr-workout-tracker",
  storageBucket: "pr-workout-tracker.firebasestorage.app",
  messagingSenderId: "515616243725",
  appId: "1:515616243725:web:07bdbda3b5a331f72a5544"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services and Export them
export const db = getFirestore(app);
export const auth = getAuth(app);
