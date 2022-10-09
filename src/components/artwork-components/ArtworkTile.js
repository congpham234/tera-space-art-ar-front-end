import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/artwork-grid-component-style.css';
import { calcImageSides } from "../../util/ImageTransform";

const ArtworkTile = ({ ptn_id, ptn_img_arn, ptn_name, str_name, ptn_width, ptn_height, ptn_category, ptn_description}) => {
    const navigate = useNavigate();
    const imageFrameOffset = 50;
    const frameSize = 180;
    var imageWidth = 5;
    var imageHeight = 5;
    const [imageStyle, setImageStyle] = useState({
        width: imageWidth.toString() + 'px',
        height: imageHeight.toString() + 'px'
    });

    useEffect(() => {
        const imageResizeToFitToFrame = calcImageSides(ptn_width, ptn_height, frameSize, imageFrameOffset);
        setImageStyle ({
            width: imageResizeToFitToFrame.imageWidth.toString() + 'px',
            height: imageResizeToFitToFrame.imageHeight.toString() + 'px'
        })
    }, [ptn_width, ptn_height]);

    const onTileClick = () => {
        navigate('/artwork-detail', { 
            state: {ptn_id, ptn_img_arn, ptn_name, ptn_width, ptn_height, ptn_category, ptn_description}
        });
    }

    return <div className="artwork-tile-container">
        <div className="artwork-tile" onClick={onTileClick}>
            <img style={imageStyle} className="artwork-tile-image" src={ ptn_img_arn }></img>
        </div>
        <div className="artwork-tile-info">
            <label className="artwork-tile-name">{ ptn_name }</label><br/>
            <label className="artwork-tile-gallary-name">{ str_name }</label>
        </div>
    </div>
};

export default ArtworkTile;