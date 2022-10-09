import React, { useState } from "react";
import UserPool from "./UserPool";
import '../../styles/auth-component-style.css';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setErrorText] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        // TODO: Add form validation
        if (password !== confirmPassword) {
            setErrorText("Password and confirm password do not match.");
            return;
        };

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                setErrorText(err.message);
                return;
            }

            navigate('/confirm',{ state: { email } });
        });

        

    };

    return (
        <div className="auth-login-container">
            <img src="./assets/logo.svg" alt='logo'></img>
            <br/>
            <label className="auth-login-label">Sign Up</label>
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
            <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm Password"
                className="auth-input-text"
                type="password"
            >
            </input>
            <br/>
            <button className="auth-submit-btn" type="submit">Create an account</button>
            </form>
            <label className="auth-prompt-text">Already have an account? <Link className="auth-link" to="/">Log in</Link></label>
        </div>
    );
}

export default Signup;