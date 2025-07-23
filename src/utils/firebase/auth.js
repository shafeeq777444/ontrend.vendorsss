import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

// import { auth, dbDemo } from "@/firebaseDemo/democonfig";



const fbProvider = new FacebookAuthProvider();

//----------------------- Fetch current user Data ---------------------------
export const fetchCurrentUserData = async () => {
  const currentUser = auth.currentUser; //firebase auth side
  console.log(currentUser)
  if (!currentUser) throw new Error("User not signed in");

  const docRef = doc(db, "users", currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();  //we extra stored data its we also add more data also
  } else {
    throw new Error("No user data found in Firestore");
  }
};

// --------------- sign with google ------------------------------------------
export const handleGoogleLogin = async ({toast,navigate}) => {

  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const uid = user.uid;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const hasMobile = !!data.number;
      const hasNationality = !!data.nationality;

      if (hasMobile && hasNationality) {
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.success("Continue signup");
        navigate("/auth/credential");
      }

    } else {
      // Firestore document doesn't exist → Create new user profile
      const displayName = user.displayName || "";
      const [firstName = "", lastName = ""] = displayName.split(" ");

      const newUser = {
        role: "User",
        email: user.email || "",
        firstName,
        lastName,
        profileImageUrl: user.photoURL || "",
        timeStamp: serverTimestamp(),
      };

      await setDoc(userRef, newUser);
      toast.success("Continue signup");
      navigate("/auth/credential");
    }

  } catch (error) {
    console.error("Google login error:", error.message);
    toast.error("Login failed: " + error.message);
  }
};


// ------------    sign with email   -----------------------------------------------------


export async function loginUser(email, password) {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in:", userCred.user);
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            console.error("No user found with this email");
        } else if (error.code === "auth/wrong-password") {
            console.error("Incorrect password");
        } else {
            console.error("Login failed:", error.message);
        }
    }
}

export async function registerUser(email, password) {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registered new user:", userCred.user);
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            console.error("This email is already registered");
        } else {
            console.error("Registration failed:", error.message);
        }
    }
}

// -----------    firebaseErrorMessages.js  ---------------------------------------------------

export function getFriendlyFirebaseError(error) {
    if (!error?.code) return "Something went wrong.";

    switch (error.code) {
        case "auth/email-already-in-use":
            return "Email already in use.";
        case "auth/invalid-email":
            return "Invalid email.";
        case "auth/weak-password":
            return "Weak password.";
        case "auth/user-not-found":
            return "User not found.";
        case "auth/wrong-password":
            return "Wrong password.";
        case "auth/network-request-failed":
            return "Network error.";
        default:
            return "Auth error.";
    }
}



// sign with Phone number---------------------------------
let confirmationResultGlobal = null;

// Set up Recaptcha
export const setupReCaptcha = () => {
    console.log(auth);
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    console.log("reCAPTCHA resolved:", response);
                },
            },
            auth
        );
    }
};

// Send OTP
export const signInWithPhone = async (phoneNumber) => {
    setupReCaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        confirmationResultGlobal = confirmationResult;
        return true;
    } catch (err) {
        console.error("Error sending OTP:", err);
        throw err;
    }
};

// Verify OTP
export const verifyOtpCode = async (otpCode) => {
    if (!confirmationResultGlobal) {
        throw new Error("No confirmation result found. Please request OTP first.");
    }

    try {
        const result = await confirmationResultGlobal.confirm(otpCode);
        return result.user; // Login successful
    } catch (err) {
        console.error("OTP verification failed:", err);
        throw err;
    }
};




// check if user Exist
export const checkIfUserExists = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists(); //true or false
};

// sign with facebook
export function signInWithFacebook() {
    signInWithPopup(auth, fbProvider)
        .then((result) => {
            const user = result.user;
            const exist = checkIfUserExists(user?.uid); //true or false
            return { exist, user };
        })
        .catch((error) => {
            console.error("Facebook Error:", error);
        });
}
