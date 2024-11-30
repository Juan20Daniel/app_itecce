import { useContext, useState } from 'react';
import { expretions } from '../../../../helpers/helpers';
import BoxActionsTamplate from '../actionsTamplate/ActionsTamplate';
import BtnAction from '../../../btnAction/BtnAction';
import InputUploadTamplate from '../inputUploadTemplate/InputUploadTamplate';
import './boxUploadTemplate.css';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
const BoxUploadTemplate = ({name, id}) => {
    const [ image, setImage ] = useState(null);
    const [ valueInput, setValueInput ] = useState('');
    const { openCentralAlert } = useContext(CentralAlertContext);
    const handleTemplate = (e) => {
        const nameFile = e.target.files[0].name;
        if(!expretions.imgTamplate.test(nameFile)) {
            const messageError = `Hay un problema con la plantilla que se intenta cargar, 
            verifica que sea .png o .jpg y si caracteres especiales en el nombre`;
            return openCentralAlert('Error al cargar la plantilla',messageError,'error');
        }
        setValueInput(e.target.value);
        const render = new FileReader();
        render.readAsDataURL(e.target.files[0]);
        render.onload = (e) => {
            setImage(e.target.result);
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(image);
    }
    const clearInput = () => {
        setImage(null);
        setValueInput('');
    }
    return (
        <form onSubmit={handleSubmit} className='box-upload-template'>
            <div className='box-loade-template'>
                {image ?
                    <img 
                        src={image} 
                        alt='Plantilla de credencial'
                        className='img-tamplate'
                    />
                :   <InputUploadTamplate 
                        id={id} 
                        valueInput={valueInput} 
                        handleTaamplate={handleTemplate}
                    />
                }
                {true && <BoxActionsTamplate>
                    <BtnAction
                        value='Quitar'
                        color='error'
                        action={clearInput}                    
                    />
                    <BtnAction
                        value='Guardar'
                        color='white'
                        type='submit'                   
                    />
                </BoxActionsTamplate>}
            </div>
            <span className='name-loader'>{name}</span>
        </form>
    );
}

export default BoxUploadTemplate;