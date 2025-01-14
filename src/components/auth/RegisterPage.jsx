import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../../../firebase';
import '../../css/auth/RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const formatErrorMessage = (message) => {
        if (message.includes('auth/weak-password')) {
            return 'Password should be at least 6 characters';
        }
        if (message.includes('auth/email-already-in-use')) {
            return 'This email is already in use';
        }
        // Add more error handling as needed
        return message;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('Registered with email and password:', email);
                navigate('/'); // Redirect to home page after registration
            } catch (error) {
                console.error('Error registering:', error);
                setError(formatErrorMessage(error.message));
            }
        } else {
            console.error('Passwords do not match');
            setError('Passwords do not match');
        }
    };

    return (
        <div className="registerPage-container">
            <div className="registerPage-card">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="registerPage-form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="registerPage-form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="registerPage-form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="registerPage-button">Register</button>
                </form>
                {error && <p className="registerPage-error-message">{error}</p>}
                <div className="registerPage-login-prompt">
                    <p>Already have an account? <Link to="/login">Log In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
