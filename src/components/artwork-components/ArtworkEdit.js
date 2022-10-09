import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { addNewPainting, editPainting } from "../../api/api";
import { calcImageSides } from "../../util/ImageTransform";
import '../../styles/artwork-edit-component-style.css';

const ArtworkEdit = () => {

    const imageFrameOffset = 90;
    const frameSize = 390;
    const imageSizeDefaultValue = 50
    const meterPerCentimeter = 0.01
    const uploadImageIcon = "/assets/upload-image.svg";

    const navigate = useNavigate();
    const { state } = {...useLocation()};
    const addNew = state.addNew ?? true;
    const storeId = state.storeId;
    const fileInputRef = useRef();
    
    const [name, setName] = useState(state.ptn_name ?? "");
    // Have All category
    // Need api to get a list of category.
    const [category, setCategory] = useState(state.ptn_category ?? "");
    const [imageWidth, setImageWidth] = useState(state.ptn_width ?? imageSizeDefaultValue);
    const [imageHeight, setImageHeight] = useState(state.ptn_height ?? imageSizeDefaultValue);
    const [description, setDescription] = useState(state.ptn_description ?? "");
    const [imgSrc, setImgSrc] = useState(state.ptn_img_arn);
    const [imageFile, setImageFile] = useState(null);

    const [imageStyle, setImageStyle] = useState({
        width: imageWidth.toString() + 'px',
        height: imageHeight.toString() + 'px'
    });

    useEffect(() => {
        // Update when there is a file uploaded
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => { 
                setImgSrc(reader.result);
            };
            reader.readAsDataURL(imageFile);
        }

        // modify the image width and length to fit into the frame
        if (imageFile || imgSrc !== uploadImageIcon) {
            const imageResizeToFitToFrame = calcImageSides(imageWidth, imageHeight, frameSize, imageFrameOffset);
            setImageStyle ({
                width: imageResizeToFitToFrame.imageWidth.toString() + 'px',
                height: imageResizeToFitToFrame.imageHeight.toString() + 'px'
            })
        } else {
            setImageStyle({});
        }
    }, [imageFile, imageWidth, imageHeight, imgSrc]);

    const onSubmit = (event) => {
        event.preventDefault();
        const paintingUploadData = {
            ptn_name: name,
            ptn_width: imageWidth * meterPerCentimeter,
            ptn_height: imageHeight * meterPerCentimeter,
            ptn_thickness: 0.03,
            ptn_cat_id: 3,
            ptn_str_id: storeId,
            ptn_img_arn: "1-" + name + ".png",
            ptn_description: "Test description"
        };

        if (state.ptn_id) {
            paintingUploadData.ptn_id = state.ptn_id;
            editPainting(paintingUploadData, imageFile);
        } else {
            addNewPainting(paintingUploadData, imageFile);
        }

        navigate('/gallary-home');
    };

    const onFileUploadClick = () => {
        fileInputRef.current.click();
        // uploadNewPainting
    }

    const onFileUploadChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            setImageFile(file);
        } else {
            setImageFile(null);
        }
    }

    const onCancel = () => {
        navigate('/gallary-home');
    };
    
    return <div className='artwork-edit-container'>
        <form className="artwork-edit-form" onSubmit={onSubmit}> 
            <div className='artwork-edit-image-container'>
                {imgSrc ? (
                    <> 
                        <img
                            style={imageStyle}
                            className='artwork-edit-image' 
                            src={imgSrc}
                            >
                        </img>
                        <br/>
                        <label className='artwork-edit-change-image-button' onClick={onFileUploadClick}>Change image</label>
                    </>
                ) : (<img src={uploadImageIcon} onClick={onFileUploadClick}></img>)}
                <input
                    className='artwork-edit-file-upload-input'
                    type="file"
                    accept="images/*"
                    ref={fileInputRef}
                    onChange={onFileUploadChange}
                ></input>
            </div>
            <div className='artwork-edit-text-container'>
                <label className="artwork-edit-label">Name of artwork</label><br/>
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="artwork-edit-input-text"
                    placeholder="Name of artwork"
                ></input><br/>

                <label className="artwork-edit-label">Category</label><br/>
                <input
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="artwork-edit-input-text"
                    placeholder="Category of artwork"
                ></input><br/>

                <label className="artwork-edit-label">Width (in cm)</label><br/>
                <input
                    value={imageWidth}
                    onChange={(event) => setImageWidth(event.target.value)}
                    className="artwork-edit-input-text"
                    placeholder="Width (in cm)"
                    type="number"
                ></input><br/>

                <label className="artwork-edit-label">Height (in cm)</label><br/>
                <input
                    value={imageHeight}
                    onChange={(event) => setImageHeight(event.target.value)}
                    className="artwork-edit-input-text"
                    placeholder="Height (in cm)"
                    type="number"
                ></input><br/>

                <label className="artwork-edit-label">Description (maximum 200 characters)</label><br/>
                <input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="artwork-edit-input-text"
                    placeholder="Short description of your artwork"
                ></input><br/>
                <button className="artwork-edit-submit-btn" onClick={onSubmit} type="submit">{addNew ? 'Publish' : 'Save'}</button><br/>
                <button className="artwork-edit-cancel-btn" onClick={onCancel} type="cancel">Cancel</button>
            </div>
        </form>
    </div>
};

export default ArtworkEdit;