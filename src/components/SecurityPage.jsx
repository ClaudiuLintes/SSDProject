import React from 'react';
import PasswordForm from './account/PasswordForm';
import '../css/SecurityPage.css';

const SecurityPage = ({ accountPassword }) => {
    return (
        <div className="securityPage-container">
            <div className="securityPage-card">
                <PasswordForm accountPassword={accountPassword} />
            </div>
        </div>
    );
}

export default SecurityPage;
