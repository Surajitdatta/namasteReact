import React from 'react';
import './Login.css'; 
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault();

        const data = {
            username: name,
            password: password,
        };

        try {
            const res = await axios.post("https://fakestoreapi.com/auth/login", data);
            localStorage.setItem("token", res.data);
            console.log("Login successful:", res.data);
            navigate("/")
        } catch (err) {
            console.error("Error during login:", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="unique-login-container">
            <div className="unique-login-box">
                <h2>Login</h2>
                <p>Please use the following credentials to login:</p>
                <p><strong>Username:</strong> mor_2314</p>
                <p><strong>Password:</strong> 83r5^_</p>
                <form onSubmit={login}>
                    <div className="unique-input-group">
                        <input 
                            type="text" 
                            required 
                            placeholder="Enter Username"
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                        />
                        <label>Username</label>
                    </div>
                    <div className="unique-input-group">
                        <input 
                            type="password" 
                            required 
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password}
                        />
                        <label>Password</label>
                    </div>
                    <button type="submit" className="unique-login-btn">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
