import React from 'react';
import { Link } from 'react-router-dom';
import '../css/DatabasePage.css';

const DatabasePage = () => {
    return (
        <div className="databasePage-container">
            <div className="databasePage-menu">
                <h1>Database Control Panel</h1>
                <div className="databasePage-buttons">
                    <Link to="/database-products" className="databasePage-button">Database Products</Link>
                    <Link to="/database-orders" className="databasePage-button">Database Orders</Link>
                </div>
            </div>
        </div>
    );
}

export default DatabasePage;
