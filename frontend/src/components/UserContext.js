// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${config.API_URL}/user/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserProfile(response.data);
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            }
        };
        fetchUserProfile();
    }, [token]);

    return (
        <UserContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </UserContext.Provider>
    );
};
