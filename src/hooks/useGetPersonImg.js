import { useState, useEffect, useContext } from 'react';
import GenerateIdsContext from '../context/generateIds/GenerateIdsContext';

export const useGetPersonImg = (id) => {
    const [ image, setImage ] = useState(null);
    const { images } = useContext(GenerateIdsContext);
    console.log(images)
    useEffect(() => {
        const resultImg = images?.find(img => img.idPerson === id);
        setImage(resultImg ? resultImg.personImage : null);
    },[id, images]);

    return { image }
}