import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../src/utils/firebase.js";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage"; // Import AuthPage

function App() {
  const [user, setUser] = useState(null); // To track the logged-in user
  const [loading, setLoading] = useState(true); // To show a loader while checking auth status

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loader once auth state is determined
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Placeholder while checking user state
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <AuthPage />}
        />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

