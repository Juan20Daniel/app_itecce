import { useState, useEffect, useContext } from 'react';
import GenerateIdContext from '../context/generateId/GenerateIdContext';

export const useGetPersonImg = (id) => {
    const [ image, setImage ] = useState(null);
    const { generateIdState } = useContext(GenerateIdContext);
    const { images } = generateIdState;

    useEffect(() => {
        const resultImg = images.find(img => img.idPerson === id);
        setImage(resultImg ? resultImg.personImage : null);
    },[id, images]);

    return { image }
}