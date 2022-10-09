import { useContext, useState, useEffect } from "react";
import ArtworkGrid from "../artwork-components/ArtworkGrid";
import GallaryInfo from './GalleryInfo';
import '../../styles/gallary-home-component-style.css';
import { getStoreByUserEmail } from "../../api/api";
import { AccountContext } from "../auth-components/Account";

const GallaryHome = () => {

    const [storeObject, setStoreObject] = useState(null);

    const { getSession } = useContext(AccountContext);

    useEffect(() => {
		const fetchStoreData = async () => {
            getSession().then(({email}) => {
                getStoreByUserEmail(email).then((data) => {
                    setStoreObject(data);
                });
            })
		};

		fetchStoreData();
	}, []);

    return <div className="gallary-home-container">
        <GallaryInfo {...storeObject}/>
        <ArtworkGrid {...storeObject}/>
    </div>

};

export default GallaryHome;