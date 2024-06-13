import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const userData = await UserService.login(email, password);
            console.log(userData);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                if (userData.role === 'ADMIN') {
                    navigate('/admin/user-management');
                } else if (userData.role === 'USER') {
                    navigate('/home');
                } else {
                    setError('Unknown role');
                }
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
