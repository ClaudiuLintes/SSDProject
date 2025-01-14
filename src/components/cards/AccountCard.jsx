import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import '../../css/cards/AccountCard.css';

const AccountCard = ({ email }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <div className="account-card">
            <p>Email: {email}</p>
            <button onClick={() => navigate('/account')} className="account-card-button">Settings</button>
            <button onClick={handleLogout} className="account-card-button">Logout</button>
        </div>
    );
};

export default AccountCard;
