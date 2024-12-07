import { useContext, useState } from "react";
import axiosInstance from '../../data/remote/axios.instance';
import GenerateIdsContext from "./GenerateIdsContext";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
const GenerateIdsProvider = ({children}) => {
    const [ images, setImages ] = useState(null);
    const [ inputValue, setInputValue ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ printIds, setPrintIds ] = useState(false);
    const [ lastRemoved, setLastRemoved ] = useState(null);
    const [ infoIdentityCard, setInfoIdentityCard] = useState([]);
    const [ infoIdentityCardNotFound, setInfoIdentityCardNotFound] = useState([]);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const getUrl = (id) => {
        return axiosInstance.get(`/schoolIdentityCard/info-identity-card/${id}`);
    }
    const saveImages = async () => {
        try {
            setIsLoading(true);
            const getUrlRequests = images.map(image => getUrl(image.idClient));
            const responses = await Promise.all(getUrlRequests);
            let toGenereteId = [];
            let notFounds = [];
            responses.forEach(response => {
                if(response.data.isActive) toGenereteId.push(response.data);
                else notFounds.push(response.data);
            });
            setInfoIdentityCard(toGenereteId);
            setInfoIdentityCardNotFound(notFounds);
            setPrintIds(true);
        } catch (error) {
            openCentralAlert('Imagenes',error.message,'error');
        } finally {
            setIsLoading(false);
        }
    }
    const removeImage = (id) => {
        setLastRemoved(id);
        const result = images.filter(image => image.idClient !== id);
        if(result.length === 0) return clear();
        setImages(result);
    }
    const clear = () => {
        setInfoIdentityCard([]);
        setInfoIdentityCardNotFound([]);
        setLastRemoved(null);
        setInputValue('');
        setImages(null);
        setPrintIds(false);
    }
    return (
        <GenerateIdsContext.Provider value={{
            images,
            inputValue,
            isLoading,
            printIds,
            lastRemoved,
            infoIdentityCard,
            infoIdentityCardNotFound,
            setInfoIdentityCard,
            setInfoIdentityCardNotFound,
            saveImages,
            setLastRemoved,
            removeImage,
            clear,
            setInputValue,
            setImages
        }}>
            {children}
        </GenerateIdsContext.Provider>
    );
}

export default GenerateIdsProvider;