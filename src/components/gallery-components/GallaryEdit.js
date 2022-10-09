import { useState } from "react";
import '../../styles/gallary-edit-component-style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateStoreInfo } from "../../api/api";

const GallaryEdit = () => {
    const navigate = useNavigate();
    const { state } = {...useLocation()};

    const [name, setName] = useState(state.str_name ?? "");
    const [address, setAddress] = useState(state.str_address ?? "");
    const [city, setCity] = useState(state.str_city ?? "");
    const [province, setProvince] = useState(state.str_province ?? "");
    const [country, setCountry] = useState(state.str_country ?? "");
    const [email, setEmail] = useState(state.str_email ?? "");
    const [phone, setPhone] = useState(state.str_phone_num ?? "");
    const [website, setWebsite] = useState(state.str_website ?? "");
    const [logo, setLogo] = useState(state.str_logo ?? "");

    const onSubmit = (event) => {
        event.preventDefault();
        if (state.str_id) {
            updateStoreInfo({
                str_id: state.str_id,
                str_name: name,
                str_address: address,
                str_city: city,
                str_country: country,
                str_phone_num: phone,
                str_province: province,
                str_website: website,
                str_email: email,
                str_usr_id: state.str_usr_id
            }).then(() => {
                navigate('/gallary-home');
            });
        }
    };

    const onCancel = (event) => {
        event.preventDefault();
        navigate('/gallary-home');
    };

    return <div className="gallary-edit-container">
        <img className="gallary-logo" src="./assets/gallary-mock-logo.png"></img>
        <form className="gallary-edit-form" onSubmit={onSubmit}>
            <label className="gallary-edit-label">Name of Gallery</label><br/>
            <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="gallary-input-text"
            >
            </input><br/>
            <label className="gallary-edit-label">Street address</label><br/>
            <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="gallary-input-text"
            >
            </input><br/>
            <label className="gallary-edit-label">City</label><br/>
            <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="gallary-input-text"
            >
            </input><br/>
            <label className="gallary-edit-label">Province</label><br/>
            <input
                value={province}
                onChange={(event) => setProvince(event.target.value)}
                className="gallary-input-text"
            >
            </input><br/>
            <label className="gallary-edit-label">Country</label><br/>
            <input
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="gallary-input-text"
            >
            </input><br/>
            <label className="gallary-edit-label">Email</label><br/>
            <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="gallary-input-text"
            >
            </input><br/>
            <label className="gallary-edit-label">Phone</label><br/>
            <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="gallary-input-text"
            >
            </input><br/>
            <label className="gallary-edit-label">Website</label><br/>
            <input
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="gallary-input-text"
            >
            </input><br/>
            <button className="gallary-submit-btn" type="submit">Save</button><br/>
            <button className="gallary-cancel-btn" onClick={onCancel} type="cancel">Cancel</button>
        </form>
    </div>;

};

export default GallaryEdit;