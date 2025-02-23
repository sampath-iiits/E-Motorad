import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      showAlert("All fields are required!", "error");
      return;
    }
    if (password.length < 6) {
      showAlert("Password must be 6 characters long!", "error");
      return;
    }
    if (password !== confirmPassword) {
      showAlert("Passwords do not match!", "error");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));
    showAlert("Registration successful!", "success");
    setTimeout(() => navigate("/") ,2000);
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
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="register">
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
          <button className="regsiterbtn"type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/">Sign in</a></p>
      </div>
    </div>
  );
};

export default Register;
