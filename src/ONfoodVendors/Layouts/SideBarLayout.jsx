import React, { useState } from "react";
import { Menu, X, ChevronDown, Zap, Search, Clock, Eye, Users, DollarSign } from "lucide-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useCurrentUser from "../../services/queries/user.query";
import LogoutConfirmation from "../components/common/LogoutCard";

import { getAuth } from "firebase/auth";
import { useFirebaseAuthReady } from "../../services/firebase/auth";

const SideBarLayout = () => {
    const authReady = useFirebaseAuthReady();
    const user = getAuth().currentUser;
    const navigate = useNavigate();
    const { data,isLoading } = useCurrentUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { name: "Orders", icon: null, route: "/" },
        { name: "Food Menus", icon:null , route: "/menu" },
        { name: "Earnings", icon: <Zap size={16} />, route: "/earnings" },
        { name: "Profile", icon: null, route: "/profile" },
    ];
    if (!authReady) return <div className="p-10 text-center">ONtrend Loading...</div>;
    if (!user) return <Navigate to="/auth" replace />;
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-900 via-sky-700 to-sky-600 text-white shadow-lg h-80 border-b-2 ">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            {/* <img className="w-20" src="/ONtrend/ONtrend-logo.png"></img> */}
                            <span className="text-xl font-semibold text-sky-100">ONtrend</span>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center gap-4">
                            {/* Profile dropdown */}
                            {data && (
                                <div className="flex items-center gap-2 cursor-pointer bg-slate-600 md:px-3 py-1 rounded-full hover:bg-slate-500 transition-colors">
                                    <img
                                        src={data?.image}
                                        alt="profile"
                                        className="w-6 h-6 rounded-full ring-2 ring-sky-300"
                                    />
                                    <span className="text-sm font-medium hidden sm:inline">{data?.name}</span>
                                    <ChevronDown size={4} className="text-sky-200 hidden sm:inline" />
                                    {/* <LogoutConfirmation/> */}
                                </div>
                            )}

                            {/* Mobile menu icon */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="text-sky-200 hover:text-white transition-colors"
                                >
                                    {menuOpen ? <X /> : <Menu />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 mt-4">
                        {menuItems.map((item, index) => (
                            <button
                                onClick={() => navigate(item?.route)}
                                key={index}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-md transition-colors ${
                                    item.route === window.location.pathname
                                        ? "bg-sky-600 text-white shadow-md "
                                        : "hover:bg-slate-600/30 hover:text-gray-100 "
                                }`}
                            >
                                {item.icon && <span className="text-sky-200">{item.icon}</span>}
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden px-4 pb-4">
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center gap-2 text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                                        item.active ? "bg-sky-600 text-white" : "hover:bg-slate-600/30 hover:text-gray-100"
                                    }`}
                                >
                                    {item.icon && <span className="text-sky-200">{item.icon}</span>}
                                    {item.name}
                                </button>
                            ))}
                            <button className="flex items-center gap-2 bg-sky-50 text-sky-700 font-semibold px-4 py-2 rounded-lg text-sm mx-4 mt-2 hover:bg-sky-100 transition-colors">
                                <Search size={16} />
                                Channel Consultation
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content Area - Children will be rendered here */}

            <div className="h-80 px-4 py-6 -mt-40">
                <Outlet />
            </div>
        </div>
    );
};

export default SideBarLayout;
