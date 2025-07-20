"use client";
import { useEffect, useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";

import SignupForm from "../../components/auth/SignUpForm";
import LoginForm from "../../components/auth/SignInForm";
import PhoneLoginForm from "../../components/auth/PhoneLoginForm";
import { signInWithGoogle } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginScreen() {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const [mode, setMode] = useState(null); // "login" | "signup" | "mobile" | null
    const handleGooglesubmit = async () => {
      try{
       const{exist,user}= await signInWithGoogle();
       if(exist){
        console.log(user,"user")
        toast.success("login successfull")
        navigate('/')
       }
       else{
        navigate('/auth/signup')
       }
      }catch(err){
        console.log(err)
      }
       
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const buttonClass =
        "w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out hover:shadow-lg";

    const renderForm = () => {
        switch (mode) {
            case "login":
                return <LoginForm onBack={() => setMode(null)} />;
            case "signup":
                return <SignupForm onBack={() => setMode(null)} />;
            case "mobile":
                return <PhoneLoginForm onBack={() => setMode(null)} />;
            default:
                return (
                    <>
                        <button className={`${buttonClass} bg-white text-black`}>
                            <FaApple size={20} />
                            Continue with Apple
                        </button>
                        <button onClick={handleGooglesubmit} className={`${buttonClass} bg-white text-black`}>
                            <FcGoogle size={20} />
                            Continue with Google
                        </button>
                        <button onClick={() => setMode("signup")} className={`${buttonClass} bg-white text-black`}>
                            <HiOutlineMail size={20} />
                            Sign up with Email
                        </button>
                        <button onClick={() => setMode("login")} className={`${buttonClass} bg-white text-black`}>
                            <HiOutlineMail size={20} />
                            Login with Email
                        </button>
                        <button
                            onClick={() => setMode("mobile")}
                            className={`${buttonClass} border border-white text-white`}
                        >
                            <FiPhone size={18} />
                            Login with Phone
                        </button>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-onRed flex flex-col md:flex-row">
            {/* Left Panel for Desktop */}
            <div className="hidden md:flex w-1/2 bg-onRed text-white items-center justify-center p-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-lg">Please sign in to continue</p>
                </div>
            </div>

            {/* Right Panel Shared for Both Mobile and Desktop */}
            <div className="flex-1 flex items-end md:items-center justify-center bg-[#2c2c2e] text-white px-6 pt-10 pb-10 md:px-8 md:py-12">
                {showContent && (
                    <div className="w-full max-w-md space-y-4">
                        <h2 className="text-3xl font-bold text-center md:hidden">Welcome</h2>
                        {renderForm()}
                        <div id="recaptcha-container" />
                    </div>
                )}
            </div>
        </div>
    );
}
