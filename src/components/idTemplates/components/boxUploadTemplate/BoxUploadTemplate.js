import React, { useContext, useState } from 'react';
import { expretions } from '../../../../helpers/helpers';
import axiosInstance from '../../../../data/remote/axios.instance';
import BoxActionsTamplate from '../boxActionsTamplate/BoxActionsTamplate';
import BtnAction from '../../../btnAction/BtnAction';
import InputUploadTamplate from '../inputUploadTemplate/InputUploadTamplate';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import './boxUploadTemplate.css';
const BoxUploadTemplate = ({name, type, id, imageTamplate, idSectionIdTemp, tamplateState, setState }) => {
    const [ image, setImage ] = useState(imageTamplate ? `data:image/jpeg;base64,${imageTamplate}`:null);
    const [ valueInput, setValueInput ] = useState('');
    const { openCentralAlert } = useContext(CentralAlertContext);
    console.log('exce')
    const updateTamplateDB = async (values, id) => {
        try {
            const keys = Object.keys(values);
            const formData = new FormData();
            keys.forEach(key => {
                formData.append([key], values[key]);
            });
            const response = await axiosInstance.patch(`/templates/${id}`, formData);
            setState({...tamplateState,[type]:response.data});
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    const handleTemplate = async (e) => {
        const file =  e.target.files[0];
        setValueInput(e.target.value);
        if(!expretions.imgTamplate.test(file.name)) {
            let errorMessage = `Hay un problema con la plantilla que se intenta cargar, 
            verifica que sea .jpg y si caracteres especiales en el nombre`;
            return openCentralAlert('Error al cargar la plantilla',errorMessage,'error');
        }
        const data = {image:file, type}
        const result = await updateTamplateDB(data, idSectionIdTemp);
        if(!result) {
            setValueInput('');
            let errorMessage = 'No se logro eliminar la plantilla por un problema en el servidor'
            return openCentralAlert('Error al eliminar la plantilla',errorMessage,'error');
        }
        const render = new FileReader();
        render.readAsDataURL(file);
        render.onload = (e) => {
            setImage(e.target.result);
            openCentralAlert('Nueva plantilla',result.message,'success');
        }
    }
    const removeImage = async () => {
        const result = await updateTamplateDB({type}, idSectionIdTemp);
        if(!result) {
            let errorMessage = 'No se logro eliminar la plantilla por un problema en el servidor'
            return openCentralAlert('Error al eliminar la plantilla',errorMessage,'error');
        }
        setImage(null);
        setValueInput('');
        openCentralAlert('Eliminación de plantilla','La plantilla se ha eliminado.','success')
    }
    const confirmRemoveImg = () => {
        const confirmMessage = '¿Seguro que quieres eliminar la plantilla de credenciales?'
        openCentralAlert('¿Eliminación de plantilla?',confirmMessage,'confirm',removeImage);
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