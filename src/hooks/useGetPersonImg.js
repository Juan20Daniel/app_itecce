import { useState, useEffect, useContext } from 'react';
import GenerateIdsContext from '../context/generateIds/GenerateIdsContext';

export const useGetPersonImg = (id) => {
    const [ image, setImage ] = useState(null);
    const { images } = useContext(GenerateIdsContext);
    useEffect(() => {
        const resultImg = images?.find(img => img.idClient === id);
        setImage(resultImg ? resultImg.image : null);
    },[id, images]);

    return { image }
}