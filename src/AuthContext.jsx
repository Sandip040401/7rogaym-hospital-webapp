import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const setSessionTimeout = useCallback(() => {
        const timeout = setTimeout(() => {
            setUser(null);
            localStorage.removeItem('token');
        }, SESSION_DURATION);
        return timeout;
    }, []);

    const fetchUser = async () => {
        const tokenString = localStorage.getItem('token');
        if (!tokenString) {
            console.error('No token found');
            setLoading(false);
            return;
        }
        const { email, expiry } = JSON.parse(tokenString);

        // Check if the token is expired
        if (new Date().getTime() > expiry) {
            localStorage.removeItem('token');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`, {
                params: { email }
            });
            setUser(response.data);
            setSessionTimeout();
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [setSessionTimeout]);

    const login = async (email, password) => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/signin`, { email, password }, {
            withCredentials: true,
        });
        setUser(response.data);

        // Store the token with an expiry time
        const expiry = new Date().getTime() + SESSION_DURATION;
        localStorage.setItem('token', JSON.stringify({ email: response.data.email, expiry }));
        setSessionTimeout();
        return response;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
