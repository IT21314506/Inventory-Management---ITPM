import React, { useEffect, useState } from "react";
import img from "../assets/user-interface.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserModal from './UserModal';
import { motion } from 'framer-motion';
import config from '../config/config';

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleDateString());
    const [token, setToken] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const time = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(time);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);

        const fetchUserProfile = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${config.API_URL}/user/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserProfile(response.data);
                } catch (error) {
                    alert("Session Expired!");
                    navigate('/login');
                    return;
                }
            }
        };
        fetchUserProfile();
    }, [token]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center justify-end h-16 p-2 mt-1 ml-6 mr-3 font-sans text-white transition duration-300 ease-in-out transform rounded-md shadow-lg bg-gradient-to-r from-cyan-600 to-teal-400 hover:from-teal-400 hover:to-cyan-600"
            >
                <motion.div
                    className="w-0.5 bg-gray-600 h-10 mr-4"
                    whileHover={{ scaleY: 1.1 }}
                />
                
                {/* Current Time Display with Smooth Transition */}
                <motion.div
                    className="text-xl cursor-default"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                >
                    {currentTime}
                </motion.div>

                <div className="w-0.5 bg-gray-600 h-10 ml-4 mr-4"></div>
                
                <div className="flex mr-5">
                    {userProfile ? (
                        <>
                            <motion.span
                                className="mt-2 cursor-pointer"
                                onClick={handleOpenModal}
                                whileHover={{ color: "cyan", scale: 1.1 }}
                            >
                                Hello, {userProfile.first_name}
                            </motion.span>
                            
                            <motion.img
                                src={img}
                                alt="profile"
                                className="w-10 ml-5 border border-black rounded-full cursor-pointer"
                                onClick={handleOpenModal}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            />
                        </>
                    ) : (
                        <span className="mt-2">Loading...</span>
                    )}
                </div>
            </motion.header>

            {isModalOpen && userProfile && (
                <UserModal
                    userProfile={userProfile}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default Header;
