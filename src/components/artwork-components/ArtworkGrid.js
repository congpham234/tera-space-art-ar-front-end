import '../../styles/artwork-grid-component-style.css';
import ArtworkTile from "./ArtworkTile";

import { useNavigate, useLocation } from 'react-router-dom';

const ArtworkGrid = ({ str_paintings, str_id }) => {

    const navigate = useNavigate();
    const addNewArtwork = () => {
        navigate('/artwork-edit', {state: { addNew: true, storeId: str_id }});
    };

    return <div className='artwork-grid-container'>
        <label className="artwork-grid-label">Artworks</label>
        <div className='artwork-image-grid'>
            <div className="artwork-tile-container" onClick={addNewArtwork}>
                <div className="artwork-tile">
                    <img src="./assets/add_new_artwork.svg"></img>
                </div>
            </div>
            { str_paintings &&
                str_paintings.map((painting) => (
                    <ArtworkTile key={painting.ptn_id} {...painting}/>
            ))}
        </div>
    </div>
};

export default ArtworkGrid;