import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from '../../../firebase';
import '../../css/auth/LogInPage.css';

const LogInPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const formatErrorMessage = (message) => {
        if (message.includes('auth/invalid-credential')) {
            return 'User or password are incorrect';
        }
        if (message.includes('auth/too-many-requests')) {
            return 'Too many attempts. Please try again later';
        }
        return 'An error occurred. Please try again';
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in with email and password:', email);
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            setError(formatErrorMessage(error.message));
        }
    };

    const handleGoogleLogIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log('Logged in with Google account');
            navigate('/');
        } catch (error) {
            console.error('Error logging in with Google:', error);
            setError('An error occurred while logging in with Google. Please try again');
        }
    };

    return (
        <div className="logInPage-container">
            <div className="logInPage-card">
                <h1>Log In</h1>
                <form onSubmit={handleLogIn}>
                    <div className="logInPage-form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="logInPage-form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="logInPage-button">Log In</button>
                </form>
                <button onClick={handleGoogleLogIn} className="logInPage-google-button">
                    Log in with Google
                </button>
                {error && <p className="logInPage-error-message">{error}</p>}
                <div className="logInPage-signup-prompt">
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
