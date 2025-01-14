import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Adjust the import path as necessary

const AuthRoute = ({ element: Component, allowedUids, ...rest }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Show a loading indicator while authentication status is being checked
    }

    if (!user) {
        // Redirect to login if the user is not logged in
        return <Navigate to="/login" />;
    }

    if (allowedUids && !allowedUids.includes(user.uid)) {
        // Redirect to not-found if the user does not have the correct uid
        return <Navigate to="/not-found" />;
    }

    return <Component {...rest} />;
};

export default AuthRoute;
