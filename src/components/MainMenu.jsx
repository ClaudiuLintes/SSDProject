import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/MainMenu.css';
import logoSVG from '../assets/logo.svg';
import basketSVG from '../assets/basket.svg';
import accountSVG from '../assets/account.svg';

const MainMenu = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };

    return (
        <nav className="MainMenu-navbar">
            <ul className="MainMenu-navbar-menu">
                <li>
                    <Link to="/home">
                        <img src={logoSVG} alt="ProjectSSD Logo" className="MainMenu-navbar-logo"></img>
                    </Link>
                </li>
                <li>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="MainMenu-searchbar"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </form>
                </li>
                <div className="MainMenu-spacer"></div>
                <li>
                    <Link to="/basket">
                        <img src={basketSVG} alt="Basket Icon" className="MainMenu-navbar-basket"></img>
                    </Link>
                </li>
                <li>
                    <Link to="/account">
                        <img src={accountSVG} alt="Account Icon" className="MainMenu-navbar-account"></img>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default MainMenu;
