import React, { useState, useContext } from 'react';
import { AccountContext } from './Account';
import '../../styles/auth-component-style.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrorText] = useState("");

    const { authenticate } = useContext(AccountContext);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(email, password).then(data => {
            console.log('Logged in!', data);
            navigate('/gallary-home');
        }).catch((err) => {
            if (err) {
                setErrorText(err.message);
                return;
            }
        });
    };

    return (
        <div className="auth-login-container">
            <img src="./assets/logo.svg"></img>
            <br/>
            <label className="auth-login-label">Log In</label>
            <br/>
            <label className="auth-error-text">{error}</label>
            <form onSubmit={onSubmit}>
                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    className="auth-input-text"
                >
                </input>
                <br/>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    className="auth-input-text"
                    type="password"
                >
                </input>
                <br/>
                <button className="auth-submit-btn" type="submit">Log In</button>
            </form>
            <label className="auth-prompt-text">Don't have an account? <Link className="auth-link" to="/signup">Sign up</Link></label>
        </div>
    );
}

export default Login;