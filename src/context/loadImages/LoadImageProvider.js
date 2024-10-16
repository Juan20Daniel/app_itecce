import { useContext, useState } from "react";
import axiosInstance from '../../data/remote/axios.instance';
import LoadImagesContext from "./LoadImageContext";
import GenerateIdContext from "../generateId/GenerateIdContext";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
const LoadImageProvider = ({children}) => {
    const [ images, setImages ] = useState(null);
    const [ inputValue, setInputValue ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ generateIds, setGenerateIds ] = useState(false);
    const [ lastRemoved, setLastRemoved ] = useState(null);
    const { addImages, addInfoIdentityCard } = useContext(GenerateIdContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const getUrl = (id) => {
        return axiosInstance.get(`/schoolIdentityCard/info-identity-card/${id}`);
    }
    const saveImages = async () => {
        try {
            setIsLoading(true);
            const getUrlRequests = images.map(image => getUrl(image.idPerson));
            const responses = await Promise.all(getUrlRequests);
            const info = responses.map(response => response.data[0]);
            addInfoIdentityCard(info);
            addImages(images);
            clear();
        } catch (error) {
            openCentralAlert('Imagenes',error.message,'error');
        } finally {
            setIsLoading(false);
        }
    }
    const removeImage = (id) => {
        setLastRemoved(id);
        const result = images.filter(image => image.idPerson !== id);
        if(result.length === 0) return clear();
        setImages(result);
    }
    const clear = () => {
        setLastRemoved(null);
        setInputValue('');
        setImages(null);
        setGenerateIds(false);
    }
    return (
        <LoadImagesContext.Provider value={{
            images,
            inputValue,
            isLoading,
            generateIds,
            lastRemoved,
            saveImages,
            removeImage,
            clear,
            setInputValue,
            setImages
        }}>
            {children}
        </LoadImagesContext.Provider>
    );
}

export default LoadImageProvider;