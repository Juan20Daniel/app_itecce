import { useContext } from "react";
import LoadImagesContext from "../../context/loadImages/LoadImageContext";
import ItemImage from "../itemImage/ItemImage";
import './showImages.css';
const ShowImages = () => {
    const { images } = useContext(LoadImagesContext);
    return (
        <ul className="show-images">
            {images.map(image => (
                <ItemImage data={image} key={image.idPerson}/>
            ))}
        </ul>
    );
}

export default ShowImages;