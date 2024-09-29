import { useState, useEffect, useContext } from 'react';
import { validateImg } from '../../../../helpers/helpers';
import { IconX } from '../../../../assets/iconX';
import { useGetPersonImg } from '../../../../hooks/useGetPersonImg';
import avatare from '../../../../assets/avatare.png';
import GenerateIdContext from '../../../../context/generateId/GenerateIdContext';
import ModalShowPersonContext from '../../../../context/modalShowPerson/ModalShowPersonContext';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import './loadImage.css';
const LoadImage = () => {
    const [ personImage, setPersonImage ] = useState('');
    const [ disableBtn, setDisableBtn ] = useState(true);
    const [ valueInput, setValueInput ] = useState('');
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { personInfo } = useContext(ModalShowPersonContext);
    const { generateIdState, addImage, removeImage, removeSelectedPerson } = useContext(GenerateIdContext);
    const { images, selectedPersons } = generateIdState;
    const { idPerson } = personInfo;
    const { image } = useGetPersonImg(idPerson);
    useEffect(() => {
        if(image) setPersonImage(image);
    },[image]);
    const handleImage = async (e) => {
        setValueInput(e.target.value);
        validateImg(e, (error, img) => {
            if(!error) {
                if(!images.length > 0) setDisableBtn(false);
                const checkImg = images.find(imgSave => imgSave === img);
                setDisableBtn(checkImg ? true : false);
                return setPersonImage(img);
            }
            setDisableBtn(error);
            openCentralAlert( 
                'Error al cargar la imagen', 
                'Hay un error con la imagen a cargar, verifica que el nombre solo sean 7 números, que la extensión sea jpg y que no haya espacios en blanco.', 
                'error'
            );
        });
    }
    const saveImg = () => {
        addImage({idPerson, personImage});
        setDisableBtn(true);
    }
    const clearInputFile = () => {
        const imgResult = images.filter(item => item.idPerson !== idPerson);
        removeImage(imgResult);
        if(selectedPersons.length > 0) {
            const selectedResult = selectedPersons.filter(item => item.idPerson !== idPerson);
            removeSelectedPerson( selectedResult);
        }
        setValueInput('');
        setPersonImage('');
        setDisableBtn(true);
    }
    return (
        <div className='box-load-img'>
            <div className='box-img'>
                <img src={personImage === '' ? avatare : personImage} alt="Avatare" className='font-img' /> 
                {!personImage ?
                    <input 
                        type="file" 
                        accept='.jpg' 
                        className='input-file' 
                        onChange={handleImage} 
                        value={valueInput}
                    />
                :
                    <button className='btn-remove-img' onClick={() => clearInputFile()} title="Quitar imagen">
                        <IconX size={15} />
                    </button>
                }
            </div>
            <span className='title'>Agregar imagen</span>
            <span className='instructions'>Arrastra una imagen hasta el cuadro o haz clic sobre él para cargar una.</span>
            <div className="box-btn">
                <button className={`btn-save-image ${disableBtn && 'btn-save-desable'}`} onClick={() => saveImg()}>Cargar</button>
            </div>
        </div>
    )
}

export default LoadImage;