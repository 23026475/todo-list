import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase"; // Correct imports
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.error("No such user document found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("userId");
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen bg-black text-white p-8">
      <div className="max-w-[600px] mx-auto bg-black/75 p-8 rounded">
        <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
        {userData ? (
          <div>
            <img
              src={userData.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <p className="text-xl mb-2">
              <strong>Name:</strong> {userData.name}
            </p>
            <p className="text-xl mb-2">
              <strong>Email:</strong> {userData.email}
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-600 py-3 px-6 mt-6 rounded font-bold text-white hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
