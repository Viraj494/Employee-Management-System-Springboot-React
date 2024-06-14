import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from "../../images/slt.png";

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            UserService.logout();
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand">
                    <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                    Mobitel - Employee Management System
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {isAdmin && (
                            <li className="nav-item">
                                <Link to="/admin/user-management" className="nav-link">
                                    User Management
                                </Link>
                            </li>
                        )}

                        {/* {isAdmin && (
                            <li className="nav-item">
                                <Link to="/admin/dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        )} */}

                        {isAuthenticated && (
                            <li className="nav-item dropdown">
                                <button
                                    className="btn btn-primary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <FaUserCircle size={32} className="text-white" />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <Link to="/profile" className="dropdown-item">
                                            View Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
