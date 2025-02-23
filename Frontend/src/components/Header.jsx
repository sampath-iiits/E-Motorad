import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaComments, FaUserCircle } from 'react-icons/fa';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      localStorage.removeItem("user"); // Clear local storage
      navigate("/"); // Redirect to SignIn
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Check auth state to trigger UI updates
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // Redirect to SignIn if no user
      }
    });

    return () => unsubscribe(); // Cleanup
  }, [auth, navigate]);

  return (
    <header className="header">
      <h2>Dashboard</h2>
      <div className="header-right">
        <div className="search-bar">
          <FaSearch className="icon search-icon" />
          <input type="search" placeholder="Search..." className="search-input" />
        </div>

        <FaBell className="icon bell-icon" />
        <FaComments className="icon chat-icon" />
        <FaUserCircle className="icon user-icon" />
        
        <button className="sign-out-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
