import { useState, useEffect } from 'react'
import './modalLoadImage.css';
import iconX from '../../assets/iconX.png';
import avatare from '../../assets/avatare.png'
import { useDispatch } from 'react-redux';
import { activeAlert, loader, getIdToGenerate } from '../../redux/dataSlice';
import iconCopy from '../../assets/iconCopy.png';
import iconCheck from '../../assets/iconCheck.png';
import ItemInfo from '../itemInfo/ItemInfo';
import iconUser from '../../assets/iconUser.png';
import iconMatric from '../../assets/iconMatric.png';
import iconSeccion from '../../assets/iconSeccion.png';
import iconGroup from '../../assets/iconGroup.png';
import ShowPrintDate from '../showPrintDate/showPrintDate';
import IdDelivered from '../idDelivered/IdDelivered';
import { sendImage, requestHTTP } from '../../api';
import { addProperty } from '../../functions';
const expNameImage = /^[A-ZÑ0-9]{5,15}.(JPG|jpg)$/;
const ModalLoadImage = ({ modalLoadImage, setModalLoadImage, setClients }) => {
    const [ typeAction, setTypeAction ] = useState('');
    const [ btnEnable, setBtnEnable ] = useState(false);
    const [ imageStudent, setImageStudent ] = useState('');
    const [ imgToSend, setImgToSend ] = useState(false);
    const [ userCopy, setUserCopy ] = useState(false);
    const { infoStudent } = modalLoadImage;
    const dispatch = useDispatch();
    useEffect(() => {
        if(infoStudent.nameImg !== "NOT_IMG") {
            setImageStudent(`http://localhost:3000/${infoStudent.nameImg}`);
        }
    },[infoStudent]);
    useEffect(() => {
        setTypeAction(imageStudent === '' ? "eliminado." : "guardado.");
    },[imageStudent]);
    const getImage = (array_img) => {
        const reader = new FileReader();
        reader.readAsDataURL(array_img.target.files[0]);
        reader.onload = e => {
            setImageStudent(e.target.result);
            setBtnEnable(true);
        }
        setImgToSend(array_img.target.files[0]);
    }
    const handleImageStudent = e => {
        if(e.target.files.length === 0) return false;
        if(e.target.files[0].type !== "image/jpeg") {
            dispatch(activeAlert({ 
                active:true,
                icon:'iconError',
                message:'La imagen del alumno, tiene que ser una imagen.jpg'
            }));
            removeImage();
            return false;
        }
        if(!expNameImage.test(e.target.files[0].name)) {
            dispatch(activeAlert({ 
                active:true,
                icon:'iconError',
                message:'El nombre de la imagen, no es el correcto, verifique que el nombre de la imagen, sea el usuario del estudiante.' 
            }));
            removeImage();
            return false;
        }
        getImage(e);
    }
    const copyUser = (user) => {
        navigator.clipboard.writeText(user);
        setUserCopy(true);
        setTimeout(() => {
            setUserCopy(false);
        }, 1000)
    }
    const removeImage = () => {
        setImageStudent('');
        infoStudent.nameImg !== "NOT_IMG" ? setBtnEnable(true) : setBtnEnable(false);
    }
    const closeLoader = () => {
        setTimeout(() => {
            dispatch(loader({status:false, value:""}));
            dispatch(activeAlert({ 
                active:true,
                icon:'iconSuccess',
                message:`La imagen se a ${typeAction}`}));
        }, 1000);
    }
    const saveImage = async () => {
        const dataToSend = { 
            oldImg:infoStudent.nameImg, 
            idClient:infoStudent.idClient, 
        }
        if(imageStudent !== '') {
            dispatch(loader({status:true, value:"Guardando..."}));
            const result = await sendImage("http://localhost:3000/api/set-image", imgToSend, dataToSend);
            if(!result) {
                dispatch(loader({status:false, value:""}));
                return dispatch(activeAlert({ 
                    active:true,
                    icon:'iconError',
                    message:'Hubo un problema en el servidor al guardar la imagen.' 
                }));
            }
            const { newImage, data } = result;
            setModalLoadImage({
                visible:true, 
                infoStudent:{...modalLoadImage.infoStudent, nameImg:newImage}
            });
            setClients({error: false, data:{
                studens:addProperty(data.studens),
                teachers:addProperty(data.teachers),
                collaborators:addProperty(data.collaborators),
            }});
        } else {
            dispatch(loader({status:true, value:"Eliminando..."}));
            const result = await requestHTTP('http://localhost:3000/api/delete-img','POST',dataToSend);
            if(result.error) {
                dispatch(loader({status:false, value:""}));
                return dispatch(activeAlert({ 
                    active:true,
                    icon:'iconError',
                    message:'Hubo un problema en el servidor al hacer la eliminación.' 
                }));
            }
            const { newImage, collaborators, studens, teachers } = result.data;
            setModalLoadImage({
                visible:true, 
                infoStudent:{...modalLoadImage.infoStudent, nameImg:newImage,}
            });
            setClients({error: false, data:{
                studens:addProperty(studens),
                teachers:addProperty(teachers),
                collaborators:addProperty(collaborators),
            }});
        }
        dispatch(getIdToGenerate([]));
        closeLoader();
        setBtnEnable(false); 
    }
    return (
        <div className={`load-image ${modalLoadImage.visible && "show-load-image"}`}>
            <div className='info-student__content'>
                <div className='box-matric'>
                    <div className='box-matric__content'>
                        <p className='label-user'>Usuario</p>
                        <p className='value-user'>{infoStudent.user_algeb}</p>
                        <button className={`btn-copy ${userCopy && "user-copeyed"}`} onClick={() => copyUser(infoStudent.user_algeb)}>
                            <span>Copiar</span>
                            <img src={userCopy ? iconCheck : iconCopy} alt="icon copy" />
                        </button>
                    </div>
                    <button className='btn-close-perfil' onClick={() => setModalLoadImage({visible:false, infoStudent:false})}>
                        <img src={iconX} alt="icon close" className='icon-close-perfil' />
                    </button>
                </div>
                <span className='info-student__content--title'>Información del alumno</span>
                <ItemInfo 
                    icon={iconUser}
                    alt="icon user"
                    title="Nombre del alumno"
                    value={infoStudent.name+" "+infoStudent.firstname+" "+infoStudent.lastname}
                />
                <ItemInfo 
                    icon={iconMatric}
                    alt="icon matricula"
                    title="Matricula"
                    value={infoStudent.registration}
                />
                <ItemInfo 
                    icon={iconSeccion}
                    alt="icon carrera"
                    title="Carrera"
                    value={infoStudent.seccion}
                />
                <ItemInfo 
                    icon={iconGroup}
                    alt="icon group"
                    title="Grupo"
                    value={infoStudent.group_studen}
                />
                <ShowPrintDate />
                <IdDelivered />
            </div>
            <div className='load-image__content'>
                <div className='load-image__box-avatare'>
                    <img src={imageStudent === '' ? avatare : imageStudent} alt="Avatare" className='load-image__avatare' />
                    {imageStudent === '' ?
                        <input type="file" accept='.jpg' className='load-image__input-file' value={imageStudent} onChange={handleImageStudent} />
                        :
                        <button className='btn-remove-img' onClick={() => removeImage()} title="Quitar imagen">
                            <img src={iconX} alt="Icon close" />
                        </button>
                    }
                </div>
                <span className='load-image__content--title'>Agregar imagen</span>
                <span className='load-image__content--instructions'>Arrastra una imagen hasta el cuadro o haz clic sobre él para cargar una.</span>
                <div className="box-btn-save-image">
                    <button onClick={() => saveImage()} className={`btn-save-image ${!btnEnable && "btn-save-desable"}`}>Guardar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalLoadImage;