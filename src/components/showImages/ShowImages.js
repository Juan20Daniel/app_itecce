import { useContext, useEffect } from "react";
import LoadImagesContext from "../../context/loadImages/LoadImageContext";
import ItemImage from "../itemImage/ItemImage";
import { getLastItems } from '../../helpers/helpers';
import './showImages.css';
const ShowImages = () => {
    const { images } = useContext(LoadImagesContext);
    useEffect(() => {
        console.log(getLastItems(images, 0, 5));
    },[]);
    return (
        <ul className="show-images">
            {images.map(image => (
                <ItemImage data={image} key={image.idPerson}/>
            ))}
            <button type="button">Mostrar mas</button>
        </ul>
    );
}

export default ShowImages;