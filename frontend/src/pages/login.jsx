import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "../components/Image";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import config from '../config/config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();        

        try {
            const response = await axios.post(`${config.API_URL}/user/login`, {
                email,
                password
            });

            // Assuming you want to store the token in local storage
            localStorage.setItem('token', response.data.token); 
            navigate('/inventory'); 

        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage("Invalid email or password. Please try again."); 
        }
    };
    
    return (
        <div className="flex flex-col h-screen md:flex-row">
            {/* Left Side */}
            <div className="flex items-center justify-center w-full md:w-2/5 bg-cyan-500 rounded-b-2xl md:rounded-r-2xl">
                <Image />
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-center w-full p-4 font-sans md:w-3/5 bg-cyan-50"> 
                <motion.div 
                    className="w-full max-w-md p-8 bg-white rounded-lg shadow-md shadow-cyan-600"
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                >
                    {/**
                     * "email": "johfdn.dsdsaoe@example.com",
    "password": "SecurePassword123!",
                     */}
                    <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h2>
                    {errorMessage && <p className="mb-4 text-center text-red-600">{errorMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold text-gray-700">Email <span className="text-red-600">*</span></label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700">Password <span className="text-red-600">*</span></label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <motion.button 
                                type="submit" 
                                className="w-full py-2 font-bold text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}   
                            >
                                Login
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <span>Don't have an account?</span>
                        <a className="font-semibold text-blue-800 hover:underline" href="/storeReg"> Register</a>
                    </div>  
                </motion.div>
            </div>
        </div>
    );
};

export default Login;