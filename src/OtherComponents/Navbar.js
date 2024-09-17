import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, removeUserInfo } from '../Authentification/HandleUserInfo';
import confirmLogout from '../Authentification/Logout';
import './NavBar.css';


const Navbar = () => {
    
    const [userInfo, setUserInfo] = useState(getUserInfo());


    const handleLogout = () => {
        confirmLogout();
        removeUserInfo(); 
        setUserInfo(null); 
    };


    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/courses">Courses</Link>
            </div>
            <div className="navbar-right">
                {userInfo ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
