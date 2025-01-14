import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SecondaryMenu.css';

const SecondaryMenu = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="SecondaryMenu-navbar">
            <ul className="SecondaryMenu-navbar-menu">
                <li onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <Link to="#">Products</Link>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li><Link to="/internal-ssds">Internal SSDs</Link></li>
                            <li><Link to="/external-ssds">External SSDs</Link></li>
                            <li><Link to="/ssd-accessories">SSD Accesories</Link></li>
                            <li><Link to="/ssd-software">Software Products</Link></li>
                        </ul>
                    )}
                </li>
                <li><Link to="/special-deals">Special Deals</Link></li>
                <li><Link to="/info">Info</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/customer-support">Customer Support</Link></li>
            </ul>
        </nav>
    );
};

export default SecondaryMenu;
