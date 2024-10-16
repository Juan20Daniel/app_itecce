import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { getLastItems } from '../../helpers/helpers';
import LoadImagesContext from "../../context/loadImages/LoadImageContext";
import ItemImage from "../itemImage/ItemImage";
import BtnShowMore from "../btnShowMore/BtnShowMore";
import './showImages.css';
const range = 43
const ShowImages = () => {
    const [ data, setData ] = useState(null);
    const [ disableBtn, setDisableBtn ] = useState(false);
    const { images, lastRemoved } = useContext(LoadImagesContext);
    const offset = useRef(0);
    const getMoreData = useCallback(() => {
        let result = getLastItems(images, offset.current, range);
        if(result.length < range) setDisableBtn(true);
        if(result.length === range) result.pop();
        console.log(result);
        if(data) setData(data => [...data, ...result]);
        else setData([...result]);
        offset.current = offset.current+range;
    },[images, data]);
    useEffect(() => {
        if(!data) getMoreData();
    },[getMoreData, data]);
    //Eliminar 
    useEffect(() => {
        if(!lastRemoved) return;
        const result = data.filter(item => item.idPerson !== lastRemoved);
        setData(result);
    },[lastRemoved]);
    return (
        <ul className="show-images">
            {data?.map(image => (
                <ItemImage data={image} key={image.idPerson}/>
            ))}
            {!disableBtn && <BtnShowMore action={getMoreData} />}
        </ul>
    );
}

export default ShowImages;