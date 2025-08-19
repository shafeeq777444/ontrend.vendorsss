import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useFirebaseAuthReady } from "../../firebase/auth";

export const useCurrentUser = () => {
  const [userData, setUserData] = useState(null);  // Stores user info if logged in
  const [isLoading, setIsLoading] = useState(true); // Loading state while fetching
  const authReady = useFirebaseAuthReady();         // Wait for Firebase Auth initialization

  useEffect(() => {
    if (!authReady) return; // Wait until Firebase Auth is ready

    const currentUser = auth.currentUser;

    // Case: User is NOT logged in
    if (!currentUser) {
      setUserData(null);
      setIsLoading(false);  // Done loading, no user
      return;
    }

    // Case: User is logged in, listen to Firestore doc
    const docRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData({ id: currentUser.uid, ...docSnap.data() });
        } else {
          setUserData(null); // No doc found, treat as not logged in
        }
        setIsLoading(false); // Done loading after snapshot
      },
      (error) => {
        console.error("Error fetching user data:", error);
        setUserData(null); // Treat error as not logged in
        setIsLoading(false);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, [authReady]);

  return { data: userData, isLoading };
};
