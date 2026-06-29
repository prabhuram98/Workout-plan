import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";

// Handle Login
window.handleLogin = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "index.html"; // Redirect to your app
    } catch (error) {
        alert("Login failed: " + error.message);
    }
};

// Handle Register
window.handleRegister = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created! Please login.");
    } catch (error) {
        alert("Registration failed: " + error.message);
    }
};
