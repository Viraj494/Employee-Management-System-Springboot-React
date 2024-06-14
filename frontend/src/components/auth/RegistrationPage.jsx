import React, { useState } from 'react';
import Swal from 'sweetalert2';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        division: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve token from storage
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: 'You are not authenticated. Please log in first.',
            });
            return;
        }

        try {
            await UserService.register(formData, token); // Pass the token to the register function
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                division: ''
            });

            // Show success notification using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'User has been registered successfully!',
                timer: 3000, // Display toast for 3 seconds
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            navigate('/admin/user-management');
        } catch (error) {
            console.error('Error registering user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: 'An error occurred while registering the user',
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter your role" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="division" className="form-label">Division:</label>
                    <input type="text" className="form-control" id="division" name="division" value={formData.division} onChange={handleInputChange} placeholder="Enter your division" required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
