import { useState, useContext } from "react";
import { AccountContext } from "./Account";
import { useNavigate, useLocation } from 'react-router-dom';
import { addNewUser } from "../../api/api";
import PinInput from "react-pin-input";


const Confirm = () => {

    const navigate = useNavigate();
    const { state } = { ...useLocation() };
    const { resendConfirmationCode, confirmRegistration } = useContext(AccountContext);
    const [confirmCode, setConfirmCode] = useState('');
    const [errorText, setErrorText] = useState('');

    let pin;

    const onSubmit = (event) => {
        event.preventDefault();
        confirmRegistration(state.email, confirmCode).then((data) => {
            addNewUser({ usr_email: state.email });
            navigate("/");
        }).catch((err) => {
            if (err) {
                pin.clear();
                setErrorText(err.message); 
                setConfirmCode('');
                return;
            }
        });
    };

    const onResendCode = (event) => {
        event.preventDefault();
        pin.clear();
        resendConfirmationCode(state.email).then((data) => {
            console.log(data)
        });
    };

    return (state.email &&
        <div className="auth-login-container">
            <img src="./assets/logo.svg"></img>
            <div className="auth-confirm-paragraph">
                <p>A verification code <br/>has been sent to your email</p>
                <label className="auth-error-text">{errorText}</label>
            </div>
            <form onSubmit={onSubmit}>
                <PinInput
                    length={6}
                    ref={(n) => pin=n}
                    initialValue=""
                    type="numeric"
                    inputStyle={{
                        borderColor: "#00000077",
                        borderRadius: "5px",
                        margin: "0 3px"
                    }}
                    inputFocusStyle={{ borderColor: "black" }}
                    onComplete={(value) => {
                        setConfirmCode(value);
                    }}
                />
                <br/>
                <button className="auth-submit-btn" type="submit">Verify account</button> <br />
                <button className="auth-confirm-resend-btn" onClick={onResendCode} type="cancel">Resend code</button>
            </form>
        </div>)
}

export default Confirm;