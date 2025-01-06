import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "../utils/firebase"; // Firebase utilities
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore utilities
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/home"); // Redirect to home if user is already logged in
    }
  }, [navigate]);

  // Email/Password Authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/home"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Authentication
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Add user details to Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          lastLogin: new Date().toISOString(),
        },
        { merge: true } // Merge with existing data
      );

      navigate("/home"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        {isSignUp ? "Create an Account" : "Welcome Back!"}
      </h1>

      {/* Authentication Form */}
      <form onSubmit={handleAuth} className="bg-white p-6 rounded shadow-md w-80">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full p-2 border rounded"
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 w-full p-2 border rounded"
          aria-label="Password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      {/* Toggle Sign-In/Sign-Up */}
      <p className="mt-4">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Processing..." : "Sign In with Google"}
      </button>
    </div>
  );
};

export default AuthPage;
