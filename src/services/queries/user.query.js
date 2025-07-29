

import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUserData, useFirebaseAuthReady } from "../firebase/auth";



const useCurrentUser = () => {
  const authReady = useFirebaseAuthReady();
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUserData,
    enabled: !!authReady, 
    staleTime: 1000 * 60 * 5, // Optional: cache for 5 mins
  });
};

export default useCurrentUser;

// hooks/useFirebaseAuthReady.js
