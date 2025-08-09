import React from "react";
import { motion } from "framer-motion";
import Alaram from "../common/Alaram";
import { Tooltip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../slices/order/orderSlice";



const StopAlertButton = ({ stopAlertSequence, alertLoop }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if(!alertLoop)
        return null;
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: alertLoop ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="scale-75 fixed bottom-4 right-4"
        >
            <Tooltip
            placement="top"
  content={<span className="text-xs">Orders</span>}
  classNames={{
    content: "px-3 py-2 text-base font-medium", // padding + larger text
  }}
>
                <button
                    onClick={()=>{
                        stopAlertSequence();
                        navigate("/")
                        dispatch(setActiveTab("Pending"))
                    }
                    }
                    className=" flex items-center gap-2 bg-white hover:bg-gray-50 text-black px-4 py-2 rounded-full shadow-md transition-all duration-200 z-10000"
                >
                    <Alaram alertLoop={alertLoop}/>
                </button>
            </Tooltip>

        </motion.div>
    );
};

export default StopAlertButton;
