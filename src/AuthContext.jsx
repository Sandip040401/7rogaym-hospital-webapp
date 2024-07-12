import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const sessionTimeoutRef = useRef(null);

    const setSessionTimeout = useCallback(() => {
        if (sessionTimeoutRef.current) {
            clearTimeout(sessionTimeoutRef.current);
        }
        sessionTimeoutRef.current = setTimeout(() => {
            setUser(null);
            localStorage.removeItem('token');
        }, SESSION_DURATION);
    }, []);

    const fetchUser = useCallback(async () => {
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
            console.error('Error fetching user:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [setSessionTimeout]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/signin`, { email, password }, {
                withCredentials: true,
            });
            const AuthToken = response.data.token;
            localStorage.setItem('admintoken', JSON.stringify(AuthToken));
            // Store the token with an expiry time
            const expiry = new Date().getTime() + SESSION_DURATION;
            localStorage.setItem('token', JSON.stringify({ email: response.data.email, expiry }));
            setUser(response.data);
            setSessionTimeout();
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        if (sessionTimeoutRef.current) {
            clearTimeout(sessionTimeoutRef.current);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
