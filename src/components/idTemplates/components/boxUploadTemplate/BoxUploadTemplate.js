import { useContext, useState } from 'react';
import { expretions } from '../../../../helpers/helpers';
import axiosInstance from '../../../../data/remote/axios.instance';
import BoxActionsTamplate from '../boxActionsTamplate/BoxActionsTamplate';
import BtnAction from '../../../btnAction/BtnAction';
import InputUploadTamplate from '../inputUploadTemplate/InputUploadTamplate';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import './boxUploadTemplate.css';
const BoxUploadTemplate = ({name, type, id, imageTamplate, idSectionIdTemp}) => {
    const [ image, setImage ] = useState(imageTamplate ? `data:image/jpeg;base64,${imageTamplate}`:null);
    const [ valueInput, setValueInput ] = useState('');
    const { openCentralAlert, closeCentralAlert } = useContext(CentralAlertContext);
    const updateTamplateDataBase = async (formData, id) => {
        try {
            const response = await axiosInstance.patch(`/templates/${id}`, formData);
            console.log(response);
            openCentralAlert('Nueva plantilla',response.message,'success');
            return true;
        } catch (error) {
            console.log(error);
            openCentralAlert('Error al cargar la plantilla',error.message,'error');
            return false;
        }
    }
    const handleTemplate = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        formData.append('type', type);
        const result = await updateTamplateDataBase(formData, idSectionIdTemp);
        if(result) {
            const render = new FileReader();
            render.readAsDataURL(e.target.files[0]);
            setValueInput(e.target.value);
            render.onload = (e) => {
                setImage(e.target.result);
            }
        }
    }
    // const handleTemplate = async (e) => {
    //     const nameFile = e.target.files[0].name;
    //     if(!expretions.imgTamplate.test(nameFile)) {
    //         const messageError = `Hay un problema con la plantilla que se intenta cargar, 
    //         verifica que sea .jpg y si caracteres especiales en el nombre`;
    //         return openCentralAlert('Error al cargar la plantilla',messageError,'error');
    //     }
    //     const formData = new FormData();
    //     formData.append('image', e.target.files[0]);
    //     formData.append('type', type);
    //     console.log(e.target.files[0])
    //     const result = await updateTamplateDB(formData, idSectionIdTemp);
    //     if(result) {
    //         const render = new FileReader();
    //         render.readAsDataURL(e.target.files[0]);
    //         setValueInput(e.target.value);
    //         render.onload = (e) => {
    //             setImage(e.target.result);
    //         }
    //     }
    // }
    const removeImage = () => {
        console.log('removing...')
        setImage(null);
        setValueInput('');
        closeCentralAlert();
    }
    const confirmRemoveImg = () => {
        const alertMessage = '¿Seguro que quieres eliminar la plantilla de credenciales?'
        openCentralAlert('¿Eliminación de plantilla?',alertMessage,'confirm',removeImage);
    }
    return (
        <div className='box-upload-template'>
            <div className='box-loade-template'>
                {image &&
                    <img
                        src={image}
                        alt='Plantilla de credencial'
                        className='img-tamplate'
                    />
                }
                <InputUploadTamplate 
                    id={id} 
                    valueInput={valueInput} 
                    handleTemplate={handleTemplate}
                />
            </div>
            {image && <BoxActionsTamplate>
                    <BtnAction
                        value='Eliminar'
                        color='error'
                        type='button'
                        action={confirmRemoveImg}                    
                    />
                </BoxActionsTamplate>}
            <span className='name-loader'>{name}</span>
        </div>
    );
}

export default BoxUploadTemplate;