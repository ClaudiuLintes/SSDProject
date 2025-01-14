import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import '../css/MainMenu.css';
import AccountCard from './cards/AccountCard';
import logoSVG from '../assets/logo.svg';
import basketSVG from '../assets/basket.svg';
import accountSVG from '../assets/account.svg';
import account_loggedSVG from '../assets/account-logged.svg';
import databaseSVG from '../assets/database.svg';
import adminIdList from './auth/AdminIdList';

const MainMenu = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(null);
    const [showAccountCard, setShowAccountCard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };

    const handleAccountClick = (e) => {
        if (!user) {
            e.preventDefault();
            navigate('/login');
        }
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
                <li
                    onMouseEnter={() => setShowAccountCard(true)}
                    onMouseLeave={() => setShowAccountCard(false)}
                >
                    <Link to={user ? "/account" : "/login"} onClick={handleAccountClick}>
                        <img
                            src={user ? account_loggedSVG : accountSVG}
                            alt="Account Icon"
                            className="MainMenu-navbar-account"
                            title={user ? user.email : 'Account'}
                        ></img>
                    </Link>
                    {user && showAccountCard && <AccountCard email={user.email} />}
                </li>
                {user && adminIdList.includes(user.uid) && (
                    <li>
                        <Link to="/database">
                            <img src={databaseSVG} alt="Database Icon" className="MainMenu-navbar-database"></img>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default MainMenu;
