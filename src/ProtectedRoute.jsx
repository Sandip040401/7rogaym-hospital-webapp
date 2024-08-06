import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admintoken'); // Check for the admin token
  if (!token) {
      return <Navigate to="/admin" />;
  }

  return children;
};

export const SubscriptionProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="text-center">
                  <svg className="mx-auto h-16 w-16 text-red-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-2">Access Restricted</h2>
                  <p className="text-gray-600 mb-4">Sorry, you do not have permission to access this page.</p>
                  <a
                    href="/"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Go back to Home
                  </a>
                </div>
              </div>
            </div>
          );
    }

    if (!user || user.subscriptionStatus !== 'active') {
        return <Navigate to="/plans" />;
    }

    return children;
};

export default ProtectedRoute;
