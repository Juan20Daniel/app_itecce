import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { getLastItems } from '../../helpers/getLastItems';
import Button from "../button/Button";
import ItemImage from "../itemImage/ItemImage";
import GenerateIdsContext from "../../context/generateIds/GenerateIdsContext";
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
        const result = data.filter(item => item.idClient !== lastRemoved);
        setData(result);
        setLastRemoved(null);
    },[lastRemoved, data, setLastRemoved]);
    return (
        <ul className="show-images">
            {data?.map(image => (
                <ItemImage data={image} key={image.idClient}/>
            ))}
            {!disableBtn && 
                <div className='box-btn-show-more'>
                    <Button
                        value='Mostrar más'
                        btnStyle='btn-show-more'
                        type='button'
                        action={getMoreData}
                    />
                </div>
            }
        </ul>
    );
}

export default ShowImages;