import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import specific Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGvBNR9jWXVGxRuqhMJesnA9TJamSZdlA",
  authDomain: "signin-project-44166.firebaseapp.com",
  projectId: "signin-project-44166",
  storageBucket: "signin-project-44166.appspot.com",
  messagingSenderId: "430419826216",
  appId: "1:430419826216:web:261be7aeda704c30c7871d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("User state changed:", currentUser);
    });
  }, []);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (!email || !password) {
      showAlert("All fields are required!", "error");
      return;
    }
    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      showAlert("Invalid email or password!", "error");
      return;
    }
  
    showAlert("Login successful!", "success");
    navigate("/dashboard"); // Instant navigation
  };
  

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Success:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      showAlert("Google Sign-In failed!", "error");
    }
  };

  return (
    <div className="container">
      {alert.message && <div className={`popup-alert ${alert.type}`}>{alert.message}</div>}

      <div className="left-section">
        <div className="logo">E-M</div>
        <div className="brand-name">E-MOTORAD</div>
        <div className="social-icons">
          <i className="fab fa-github"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-discord"></i>
        </div>
      </div>

      <div className="right-section">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <button className="googlebutton" type="button" onClick={signInWithGoogle}>
            <i className="fab fa-google"></i> Sign In with Google
          </button>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signin-form button" type="submit">
            Sign In
          </button>
        </form>
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default SignIn;
