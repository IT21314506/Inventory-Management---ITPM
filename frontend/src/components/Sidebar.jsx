import React from 'react';
import logo from '../assets/stockMaster.png';
import { FaHouse, FaCartShopping } from "react-icons/fa6";
import { MdAddToPhotos ,MdInventory2 } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoStorefront } from "react-icons/io5";
import axios from 'axios';
import { motion } from 'framer-motion';
import config from '../config/config';

const Sidebar = () => {
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${config.API_URL}/user/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('token'); 
            window.location.href = '/login';
        } catch (error) {
            console.error("Logout error:", error);
            alert("Error logging out. Please try again.");
        }
    };

    return (
        <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='w-full'
        >
            <aside className="flex flex-col w-full h-screen font-sans bg-white shadow-lg text-cyan-600">
                {/* Logo Section */}
                <a href='/'>
                    <motion.div
                        className="flex items-center p-4 bg-white shadow-inner rounded-e-lg"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img src={logo} alt="Stock Master Logo" className='w-20' />
                        <h1 className="ml-2 text-2xl font-bold text-cyan-600">HomeStock </h1>
                    </motion.div> 
                </a>
                
                {/* Navigation Menu */}
                <nav className="flex-grow p-4 shadow-inner bg-gradient-to-r from-cyan-100 to-cyan-50 rounded-e-lg">
                    <ul>
                        {[
                            { path: "/", label: "Dashboard", Icon: FaHouse },
                            { path: "/inventory", label: "Inventory", Icon: MdInventory2 },
                         /*   { path: "/stores", label: "Stores", Icon: IoStorefront },
                           { path: "/orders", label: "Orders", Icon: FaCartShopping },*/
                            { path: "/addProduct", label: "Add Product", Icon: MdAddToPhotos }
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.05, backgroundColor: "#d1e7dd" }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-2"
                            >
                                <a href={item.path} className="flex items-center p-3 text-xl transition duration-200 rounded-md bg-gradient-to-r hover:from-cyan-200 hover:to-cyan-300">
                                    <item.Icon className='text-gray-800 ml-9'/>
                                    <span className="ml-4">{item.label}</span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* Logout Section */}
                <motion.div
                    whileHover={{ scale: 1.1, color: "#d9534f" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center justify-center p-2 mb-4 text-xl font-bold transition duration-200 rounded cursor-pointer text-cyan-600 hover:bg-cyan-50"
                >
                    <CiLogout className="mr-2" />
                    <span>Log Out</span>
                </motion.div>
            </aside>
        </motion.div>
    );
};

export default Sidebar;
