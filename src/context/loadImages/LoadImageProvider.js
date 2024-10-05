import { useContext, useState } from "react";
import axiosInstance from '../../data/remote/axios.instance';
import LoadImagesContext from "./LoadImageContext";
import GenerateIdContext from "../generateId/GenerateIdContext";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
const LoadImageProvider = ({children}) => {
    const [ images, setImages ] = useState(null);
    const [ inputValue, setInputValue ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const { addImages, addInfoSchool } = useContext(GenerateIdContext);
    const { openCentralAlert } = useContext(CentralAlertContext);

    const getSchollInfo = (id) => {
        return axiosInstance.get(`/students/get-info-school/${id}`);
    }
    const saveImages = async () => {
        try {
            setIsLoading(true);
            const getRequest = images.map(image => getSchollInfo(image.idPerson));
            const result = await Promise.all(getRequest);
            const getInfo = result
                .filter(item => item.data.length > 0)
                .map(item => item.data[0]);
            addInfoSchool(getInfo);
            addImages(images);
            setImages(null);
            setInputValue('');
            openCentralAlert(
                'Imagenes',
                'Las imagenes han sido cargadas',
                'success'
            );
        } catch (error) {
            openCentralAlert(
                'Imagenes',
                error.message,
                'error'
            );
        } finally {
            setIsLoading(false);
        }
    }
    const removeImage = (id) => {
        const result = images.filter(image => image.idPerson !== id);
        if(result.length === 0) return cancel();
        setImages(result);
    }
    const cancel = () => {
        setInputValue('');
        setImages(null);
    }
    return (
        <LoadImagesContext.Provider value={{
            images,
            inputValue,
            isLoading,
            saveImages,
            removeImage,
            cancel,
            setInputValue, 
            setImages
        }}>
            {children}
        </LoadImagesContext.Provider>
    );
}

export default LoadImageProvider;