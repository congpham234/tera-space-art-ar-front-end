const API_URL = process.env.REACT_APP_API_URL;

// http://localhost:8000/api/v1/paintings

export const getStoreByUserEmail = async (usr_email) => {
	const response = await fetch(`${API_URL}/stores/user/${usr_email}`);
	const responseJson = response.json();
	return responseJson;
};

export const updateStoreInfo = async (storeObject) => {
    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeObject)
    };

    const response = await fetch(`${API_URL}/stores/`, requestOptions);
	return response.status;
}

// Adding new user will automatically create new store in the backend
export const addNewUser = async (user) => {
    // Simple PUT request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = await fetch(`${API_URL}/users/`, requestOptions);
	return response.status;
}

export const addNewPainting = async (paintingData, imageFile) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paintingData)
    };
    const response = await fetch(`${API_URL}/paintings/`, requestOptions);
    const objectString = decodeBase64String(await response.text());
	const preSignedUrlObject = JSON.parse(objectString);
    // Set file to imageFile to be uploaded to S3
    preSignedUrlObject.fields.file = imageFile;

    const S3Response = await uploadImageToS3UsingPresignedUrl(preSignedUrlObject, imageFile);

    return S3Response.status;
}

export const editPainting = async (paintingData, imageFile) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paintingData)
    };
    const response = await fetch(`${API_URL}/paintings/`, requestOptions);
    const objectString = decodeBase64String(await response.text());
	const preSignedUrlObject = JSON.parse(objectString);
    // Set file to imageFile to be uploaded to S3
    if (imageFile) {
        
        preSignedUrlObject.fields.file = imageFile;

        const S3Response = await uploadImageToS3UsingPresignedUrl(preSignedUrlObject, imageFile);

        return S3Response.status;
    }


    return response.status;
}


const decodeBase64String = (data) => {
    return atob(data)
}

const uploadImageToS3UsingPresignedUrl = async (preSignedUrlObject) => {
    const { url, fields } = preSignedUrlObject
    const formData = new FormData();
    
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[key]);
    });

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    const response = await fetch(url, requestOptions);

    return response;
}



