import '../../styles/gallary-home-component-style.css';
import { useNavigate } from 'react-router-dom';

const GallaryInfo = ({ str_id,
    str_address, str_city, str_country, 
    str_logo, str_name, str_email,
    str_phone_num, str_province, str_website, str_usr_id }) => {

    const navigate = useNavigate();

    const navigateToGallaryEdit = (event) => {
        event.preventDefault();
        navigate('/gallary-edit', { state: { str_id,
            str_address, str_city, str_country, 
            str_logo, str_name, str_email,
            str_phone_num, str_province, str_website, str_usr_id }
        });
    };

    return <div className="gallary-info-container">

        <button className="gallary-info-edit-button" onClick={navigateToGallaryEdit}>
            <img className="gallary-info-edit-button-icon" src="/assets/pencil-icon.svg"></img>
        </button>

        {str_logo &&
            <img className="gallary-logo" src={str_logo}></img>
        }

        <label className="gallary-info-name">{str_name}</label><br/>

        <div className="gallary-info-text-align">
            <label className="gallary-info-text">
                Address: {str_address} 
                {str_city && "," + str_city} 
                {str_province && "," + str_province}
            </label><br/>
            <label className="gallary-info-text">Email: {str_email}</label><br/>
            <label className="gallary-info-text">Phone: {str_phone_num}</label><br/>
            <label className="gallary-info-text">Website: {str_website}</label>
        </div>
    </div>
};

export default GallaryInfo;