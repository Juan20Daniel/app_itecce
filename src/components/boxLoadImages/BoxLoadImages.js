import { useContext } from 'react';
import imgLoadImages from '../../assets/img-load-images.png';
import LoadImagesContext from '../../context/loadImages/LoadImageContext';
import './boxLoadImages.css';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
const BoxLoadImages = () => {
    const {  inputValue, setInputValue, setImages } = useContext(LoadImagesContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const handleChange = (event) => {
        setInputValue(event.target.value);
        const files = Array.from(event.target.files);
        const validImgs = files.map(file => /^[0-9]{7}.(jpg|JPG)$/.test(file.name) ? true : false);
        if(validImgs.includes(false)) {
            openCentralAlert(
                'Error al cargar las imagenes',
                'El nombre o la extención de una de las imagenes no es correcto, verifica que sean 7 números y extención JPG.',
                'error'
            );
            return setInputValue('');
        }
        const imagesArray = files.map(file => {
            return {
                idPerson:parseInt(file.name.split('.')[0]),
                personImage:URL.createObjectURL(file)
            }
        });
        setImages(imagesArray);
    }
    return (
        <div className="box-load-images">
            <img src={imgLoadImages} alt='Ilustration' className='ilustration-load-images' />
            <input
                type='file'
                accept='.jpg'
                className='input-load-images'
                onChange={handleChange}
                multiple
                value={inputValue}
            />
        </div>
    );
}

export default BoxLoadImages;