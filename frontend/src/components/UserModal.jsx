import React from 'react';
import { motion } from 'framer-motion'; 

const UserModal = ({ userProfile, onClose }) => {
    
    const variants = {
        hidden: { opacity: 0, y: -50 }, 
        visible: { opacity: 1, y: 0 },  
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div 
                className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
                initial="hidden" 
                animate="visible" 
                exit="hidden" 
                variants={variants} 
                transition={{ duration: 0.3 }} 
            >
                <h2 className="text-xl font-bold text-center">User Details</h2>
                <div className="mt-4 space-y-2">
                    <p><strong>First Name:</strong> {userProfile.first_name}</p>
                    <p><strong>Last Name:</strong> {userProfile.last_name}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>Phone:</strong> {userProfile.phone}</p>
                    <p><strong>Address:</strong> {userProfile.address}</p>
                    <p><strong>Role:</strong> {userProfile.role}</p>
                    <p><strong>Date:</strong> {new Date(userProfile.date).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <button 
                        className="px-4 py-2 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default UserModal;