import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useFirebaseAuthReady } from "../../firebase/auth";

export const useCurrentUser = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const authReady = useFirebaseAuthReady(); // Custom hook or flag to check if Firebase Auth is ready

  useEffect(() => {
    // Check if Firebase auth is ready and if there's a signed-in user
    if (!authReady || !auth.currentUser) {
      setIsLoading(false);
      setIsError(true); // Error or loading state if auth is not ready or no user is signed in
      return;
    }

    const currentUser = auth.currentUser;
    const docRef = doc(db, "users", currentUser.uid);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData({
            id: currentUser.uid,
            ...docSnap.data(),
          });
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      },
      (error) => {
        setIsError(true);
        setIsLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [authReady]); // Re-run effect only when authReady changes

  return { data:userData, isLoading, isError };
};
