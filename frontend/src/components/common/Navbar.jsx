import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import logo from "../../images/slt.png"

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            UserService.logout();
            navigate('/login'); // Redirect to login page after logout
        }
    };

    return (
        <nav className="navbar bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
            <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Set the logo here */}
            <Link to="/home" className="navbar-brand">Mobitel - Employee Management System</Link>
                <div className='nav-item'>
                    {isAdmin && <Link to="/admin/user-management">User Management</Link>}
                </div>
                {isAuthenticated &&
                    <div className="dropdown ms-auto">
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
                            <li><Link to="/profile" className="dropdown-item">View Profile</Link></li>
                            <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;
