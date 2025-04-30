import React, { useState } from "react";
import axios from "axios";
import Image from "../components/Image";
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import config from '../config/config';

const StoreRegister = () => {
    const [fullName, setFullName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`${config.API_URL}/user/register`, {
                first_name: fullName,
                last_name: lastName,
                email,
                password,
                phone,
                address,
            });
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMessage("Registration failed. Please try again."); 
        }
    }
    return (
        <div className="flex h-screen">
            {/* Left Side */}
            <div className="flex items-center justify-center w-2/5 bg-cyan-500 rounded-r-2xl">
                <Image />
            </div>
    
           {/* Right Side */}
            <div className="flex items-center justify-center w-3/5 p-4 font-sans font-bold bg-cyan-50"> 
            
                <div className="w-full h-full max-w-3xl p-6 text-xs bg-white rounded-lg shadow-slate-500">
                <motion.div 
                   
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                >
                    <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Create an Account</h2> 
                    {errorMessage && <p className="mb-4 text-center text-red-600">{errorMessage}</p>}
    
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700">First Name <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    value={fullName}
                                    placeholder="First Name"
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-gray-700">Last Name <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-gray-700">Email <span className="text-red-600">*</span></label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-gray-700">Password <span className="text-red-600">*</span></label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-gray-700">Confirm Password <span className="text-red-600">*</span></label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-gray-700">Phone <span className="text-red-600">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
    
                            <div>
                                <label className="block text-gray-700">Address <span className="text-red-600">*</span></label>
                                <textarea
                                    id="address"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
    
                            <button type="submit" className="w-full py-2 font-bold text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700">
                                Register
                            </button>
                        </div>
                    </form>
                  <div className="mt-4 text-center">
                        <span>Already have an account?</span>
                        <a className="font-semibold text-blue-800 hover:underline" href="/login"> Login</a>
                    </div>  </motion.div> 
                </div>
               
            </div>
        </div>
    ); 
}

export default StoreRegister;
