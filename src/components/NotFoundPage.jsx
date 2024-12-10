import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="NotFoundPage-container">
            <div className="NotFoundPage-card">
                <h1>Oops! Page Not Found</h1>
                <p>We couldn't find what you were looking for. But don't worry, you can return to the site using the button below.</p>
                <Link to="/">
                    <button className="NotFoundPage-button">Return to the site</button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
