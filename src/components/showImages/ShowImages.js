import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { getLastItems } from '../../helpers/helpers';
import ItemImage from "../itemImage/ItemImage";
import GenerateIdsContext from "../../context/generateIds/GenerateIdsContext";
import BtnShowMore from "../btnShowMore/BtnShowMore";
import './showImages.css';
const range = 43
const ShowImages = () => {
    const [ data, setData ] = useState(null);
    const [ disableBtn, setDisableBtn ] = useState(false);
    const { images, lastRemoved, setLastRemoved } = useContext(GenerateIdsContext);
    const offset = useRef(0);
    const getMoreData = useCallback(() => {
        let result = getLastItems(images, offset.current, range);
        if(result.length < range) setDisableBtn(true);
        if(result.length === range) result.pop();
        if(data) setData(data => [...data, ...result]);
        else setData([...result]);
        offset.current = offset.current+range-1;
    },[images, data]);
    useEffect(() => {
        if(!data) getMoreData();
    },[getMoreData, data]);
    //En caso de que se elimine una imagen.
    useEffect(() => {
        if(!lastRemoved) return;
        const result = data.filter(item => item.idPerson !== lastRemoved);
        setData(result);
        setLastRemoved(null);
    },[lastRemoved, data, setLastRemoved]);
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