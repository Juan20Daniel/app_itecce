import { useContext } from 'react';
import { expretions } from '../../helpers/expretions';
import imgLoadImages from '../../assets/img-load-images.png';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import GenerateIdsContext from '../../context/generateIds/GenerateIdsContext';
import './boxLoadImages.css';
const BoxLoadImages = () => {
    const {  inputValue, setInputValue, setImages } = useContext(GenerateIdsContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const handleChange = (event) => {
        setInputValue(event.target.value);
        const files = Array.from(event.target.files);
        const validImgs = files.map(file => expretions.imgClient.test(file.name) ? true : false);
        if(validImgs.includes(false)) {
            openCentralAlert(
                'Error al cargar las imágenes',
                'El nombre o la extensión de una de las imágenes no es correcto, verifica que el nombre tenga 7 números y extención JPG o PNG.',
                'error'
            );
            return setInputValue('');
        }
        const imagesArray = files.map(file => {
            return {
                idClient:parseInt(file.name.split('.')[0]),
                image:URL.createObjectURL(file)
            }
        });
        setImages(imagesArray);
    }
    return (
        <div className="box-load-images">
            <img src={imgLoadImages} alt='Ilustration' className='ilustration-load-images' />
            <input
                type='file'
                accept='.jpg, .png'
                className='input-load-images'
                onChange={handleChange}
                multiple
                value={inputValue}
            />
        </div>
    );
}

export default BoxLoadImages;