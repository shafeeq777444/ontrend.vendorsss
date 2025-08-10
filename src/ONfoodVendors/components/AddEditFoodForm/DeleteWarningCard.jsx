import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const DeleteWarningCard = ({ onDelete, className = '' }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-5 rounded-xl shadow-xl border border-gray-800 ${className}`}
        >
            <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="bg-yellow-500/20 p-2.5 rounded-lg flex-shrink-0">
                    <AlertTriangle size={22} className="text-yellow-400" />
                </div>
                <div className="flex-1">
                    <h4 className="font-medium text-sm sm:text-[15px] text-gray-100 mb-2">
                        Important: About Deleting Items
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        To temporarily hide this item from customers, use the <span className="font-medium text-yellow-300">status toggle</span> above.
                        This will keep your data while making it invisible to customers. Only use the delete option below if you want to permanently remove this item.
                    </p>
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={onDelete}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Item Permanently
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default DeleteWarningCard;
