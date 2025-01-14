import React from 'react';
import PersonalDetails from './account/PersonalDetails';
import { useNavigate } from 'react-router-dom';
import '../css/Account.css';

const Account = ({ accountData }) => {
    const navigate = useNavigate();

    const handleMyOrdersClick = () => {
        navigate('/orders');
    };

    const handleSecurityOptionsClick = () => {
        navigate('/security-options');
    };

    return (
        <div className="Account-container">
            <div className="Account-details">
            <div className="Account-buttons">
                <button onClick={handleMyOrdersClick} className="account-button">
                    My Orders
                </button>
                <button onClick={handleSecurityOptionsClick} className="account-button">
                    Security Options
                </button>
            </div>
                <PersonalDetails accountData={accountData} />
            </div>
        </div>
    );
}

export default Account;
