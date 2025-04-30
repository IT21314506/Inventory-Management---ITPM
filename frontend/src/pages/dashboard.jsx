import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaWarehouse, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import config from '../config/config';

const Dashboard = () => {
    const [token, setToken] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            setToken(token);
            if (token) {
                try {
                    const response = await axios.get(`${config.API_URL}/user/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserProfile(response.data);
                } catch (error) {
                    console.error("Failed to fetch user profile!", error);
                }
            }
        };
        fetchUserProfile();
    }, []);

    return (
        <div className="min-h-screen p-10 bg-gray-100">
            <h2 className="mb-6 text-4xl font-bold text-center text-cyan-600">Dashboard</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total Products Card */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex flex-col items-center p-6 text-white rounded-lg shadow-lg bg-cyan-600"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl"
                    >
                        <FaBox />
                    </motion.div>
                    <h3 className="mt-2 text-xl font-semibold">Total Products</h3>
                    <p className="text-2xl font-bold">100</p>
                </motion.div>

                {/* Out of Stock Card */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex flex-col items-center p-6 text-white bg-teal-500 rounded-lg shadow-lg"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl"
                    >
                        <FaWarehouse />
                    </motion.div>
                    <h3 className="mt-2 text-xl font-semibold">Out of Stock</h3>
                    <p className="text-2xl font-bold">5</p>
                </motion.div>

                {/* Sales Card */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex flex-col items-center p-6 text-white bg-purple-500 rounded-lg shadow-lg"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl"
                    >
                        <FaDollarSign />
                    </motion.div>
                    <h3 className="mt-2 text-xl font-semibold">Total Sales</h3>
                    <p className="text-2xl font-bold">$5000</p>
                </motion.div>

                {/* Orders Card */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex flex-col items-center p-6 text-white bg-blue-500 rounded-lg shadow-lg"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl"
                    >
                        <FaShoppingCart />
                    </motion.div>
                    <h3 className="mt-2 text-xl font-semibold">Orders</h3>
                    <p className="text-2xl font-bold">45</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
