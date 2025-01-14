import React, { useState } from 'react';
import { auth } from '../../../firebase'; // Import Firebase auth
import '../../css/account/PasswordForm.css';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const PasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (!user) {
            setErrorMessage('No user is logged in.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setErrorMessage('New passwords do not match.');
            return;
        }

        const credential = EmailAuthProvider.credential(
            user.email, 
            oldPassword
        );

        try {
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            alert('Password changed successfully!');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error changing password:', error);
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                setErrorMessage('Old password is incorrect.');
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage('New password should be at least 6 characters long.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="passwordForm-container">
            <h1>Change Password</h1>
            <form onSubmit={handleChangePassword}>
                <div className="passwordForm-form-group">
                    <label>
                        Old Password
                        <input 
                            type="password" 
                            value={oldPassword} 
                            onChange={(e) => setOldPassword(e.target.value)} 
                        />
                    </label>
                </div>
                <div className="passwordForm-form-group">
                    <label>
                        New Password
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                    </label>
                </div>
                <div className="passwordForm-form-group">
                    <label>
                        Confirm New Password
                        <input 
                            type="password" 
                            value={confirmNewPassword} 
                            onChange={(e) => setConfirmNewPassword(e.target.value)} 
                        />
                    </label>
                </div>
                {errorMessage && <p className="passwordForm-error-message">{errorMessage}</p>}
                <button type="submit" className="passwordForm-submit-button">Change Password</button>
            </form>
        </div>
    );
};

export default PasswordForm;
