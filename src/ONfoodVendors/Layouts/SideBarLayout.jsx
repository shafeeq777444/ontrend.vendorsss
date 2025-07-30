import React, { useState } from "react";
import { Menu, X, ChevronDown, Zap, Search, Clock, Eye, Users, DollarSign } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const SideBarLayout = () => {
    const navigate=useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { name: "Food Menus", icon: <Zap size={16} /> ,route:"/menu"},
        { name: "Orders", icon: null ,route:"/"},
        { name: "Earnings", icon: null ,route:"/earnings"},
        { name: "Profile", icon: null ,route:"/profile" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md h-70">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            {/* <img className="w-20" src="/ONtrend/ONtrend-logo.png"></img> */}
                            <span className="text-xl font-semibold">ONtrend</span>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center gap-4">
                            {/* Profile dropdown */}
                            <div className="flex items-center gap-2 cursor-pointer bg-red-700 px-3 py-1 rounded-full">
                                <img src="https://i.pravatar.cc/32" alt="profile" className="w-6 h-6 rounded-full" />
                                <span className="text-sm font-medium hidden sm:inline">Floyd Howard</span>
                                <ChevronDown size={4} />
                            </div>

                            {/* Mobile menu icon */}
                            <div className="lg:hidden">
                                <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 mt-4">
                        {menuItems.map((item, index) => (
                            <button
                            onClick={()=>navigate(item?.route)}
                                key={index}
                                className={`flex items-center gap-2 px-3 py-2 rounded-full text-md transition ${
                                    item.active ? "bg-red-700/80 text-white" : "hover:text-gray-200"
                                }`}
                            >
                                {item.icon && <span>{item.icon}</span>}
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
                                    className={`flex items-center gap-2 text-left px-4 py-2 text-sm rounded ${
                                        item.active ? "bg-red-700 text-white" : "hover:bg-red-400"
                                    }`}
                                >
                                    {item.icon && <span>{item.icon}</span>}
                                    {item.name}
                                </button>
                            ))}
                            <button className="flex items-center gap-2 bg-white text-red-600 font-semibold px-4 py-2 rounded-full text-sm mx-4 mt-2">
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
