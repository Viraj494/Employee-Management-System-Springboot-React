import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Profile Information</h2>
                    <p className="card-text"><strong>Name:</strong> {profileInfo.name}</p>
                    <p className="card-text"><strong>Email:</strong> {profileInfo.email}</p>
                    <p className="card-text"><strong>Role:</strong> {profileInfo.role}</p>
                    <p className="card-text"><strong>City:</strong> {profileInfo.city}</p>
                    {profileInfo.role === "ADMIN" && (
                        <Link to={`/update-user/${profileInfo.id}`} className="btn btn-primary">
                            Update This Profile
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
