// import { useQuery } from "@tanstack/react-query";
// import {  useFirebaseAuthReady } from "../firebase/auth"; // Ensure correct import
// import { fetchCurrentUserData } from "../hooks/profile/useCurrentUserLiveData";

// const useCurrentUser = () => {
//   const authReady = useFirebaseAuthReady();

//   return useQuery({
//     queryKey: ["currentUser"],
//     queryFn: fetchCurrentUserData,
//     enabled: !!authReady, // Fetch when auth is ready
//     staleTime: 1000 * 60 * 5, // Optional: cache for 5 mins
//     refetchOnWindowFocus: false, // Avoid refetching when window is focused
//     retry: false, // Avoid retrying on error if needed
//     // Automatically refetch data when the snapshot changes
//     refetchInterval: 1000, // Check for updates every 1 second (or adjust interval as needed)
//     refetchOnReconnect: true, // Trigger refetch when reconnecting to the internet
//   });
// };

// export default useCurrentUser;
