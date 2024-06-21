import { useState, useLayoutEffect } from 'react';
import { validateImg } from '../../../../helpers/helpers';
import { setCentralAlert } from '../../../../redux/dataSlice';
import { setImages, setRemoveImg } from '../../../../redux/dataSlice';
import { IconX } from '../../../../assets/iconX';
import { useDispatch, useSelector } from 'react-redux';
import avatare from '../../../../assets/avatare.png';
import './loadImage.css';
const LoadImage = ({personInfo}) => {
    const [ personImage, setPersonImage ] = useState('');
    const [ disableBtn, setDisableBtn ] = useState(true);
    const [ valueInput, setValueInput ] = useState('');
    const { images } = useSelector(state => state.credenciales);
    const { idPerson } = personInfo;
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        const getImage = images.find(item => item.idPerson === idPerson);
        if(getImage) setPersonImage(getImage.personImage);
    },[idPerson, images]);
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
            dispatch(setCentralAlert({
                visible:true, 
                title:'Error al cargar la imagen', 
                message:'Hay un error con la imagen a cargar, verifica que el nombre solo sean 7 números, que la extensión sea jpg y que no haya espacios en blanco.', 
                type:'error' 
            }));
        });
    }
    const saveImg = () => {
        dispatch(setImages({idPerson, personImage}));
        setDisableBtn(true);
    }
    const clearInputFile = () => {
        const result = images.filter(item => item.idPerson !== idPerson);
        dispatch(setRemoveImg(result));
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