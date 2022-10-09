import { useNavigate, useLocation } from 'react-router-dom';
import { calcImageSides } from "../../util/ImageTransform";
import '../../styles/artwork-detail-component-style.css';

const ArtworkDetail = () => {
    const imageFrameOffset = 90;
    const frameSize = 390;
    const { state } = {...useLocation()};
    const navigate = useNavigate();
    const imageResizeToFitToFrame = calcImageSides(state.ptn_width, state.ptn_height, frameSize, imageFrameOffset);
    const imageStyle = {
        width: imageResizeToFitToFrame.imageWidth.toString() + 'px',
        height: imageResizeToFitToFrame.imageHeight.toString() + 'px'
    };

    const navigateToArtworkEdit = () => {
        navigate('/artwork-edit', { state: {...state, addNew:false} });
    };

    const navigateBack = () => {
        navigate(-1);
    }

    return <div className='artwork-detail-container'>
        <div className='artwork-detail-image-container'>
            <img className='artwork-detail-image' src={state.ptn_img_arn} style={imageStyle}></img>
            <button className="artwork-detail-edit-button" onClick={navigateToArtworkEdit}>
                <img className="artwork-detail-edit-button-icon" src="/assets/pencil-icon.svg"></img>
            </button>
            <button className="artwork-detail-back-button" onClick={navigateBack}>
                <img className="artwork-detail-edit-button-icon" src="/assets/back-arrow.svg"></img>
            </button>
        </div>
        <div className='artwork-detail-info-container'>
            <label className='artwork-detail-label-title'> {state.ptn_name} </label>
            <br/>
            <label className='artwork-detail-label'>Category: {state.ptn_category}</label>
            <br/>
            <label className='artwork-detail-label'>Size: {state.ptn_width} x {state.ptn_height}</label>
            <br/>
            <label className='artwork-detail-label'>Description: <br/> {state.ptn_description}</label>
        </div>
    </div>
};

export default ArtworkDetail;