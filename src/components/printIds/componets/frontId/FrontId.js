import { useGetPersonImg } from '../../../../hooks/useGetPersonImg';
import { useContext } from 'react';
import IdTamplatesContext from '../../../../context/idTamplates/IdTamplatesContext';
import NotFountTamplate from '../notFoundTamplate/NotFountTamplate';
import './frontId.css';
const sections = {
    "BACHILLERATO GENERAL":"NIVEL MEDIO SUPERIOR",
    "BACHILLERATO TÉCNICO EN SEGURIDAD PÚBLICA":"NIVEL MEDIO SUPERIOR",
    "BACHILLERATO TÉCNICO EN COMERCIO EXTERIOR":"NIVEL MEDIO SUPERIOR",
    "LICENCIATURA EN ADMINISTRACIÓN":"LIC. EN ADMINISTRACIÓN",
    "LICENCIATURA EN ADUANAS Y COMERCIO EXTERIOR":"LIC. EN ADUANAS Y COM. EXT.",
    "LICENCIATURA EN DISEÑO GRÁFICO":"LICENCIATURA EN DISEÑO GRÁFICO",
    "LICENCIATURA EN DERECHO":"LICENCIATURA EN DERECHO",
    "LICENCIATURA EN NUTRICIÓN":"LICENCIATURA EN NUTRICIÓN",
    "LICENCIATURA EN CONTABILIDAD":"LIC. EN CONTABILIDAD",
    "LICENCIATURA EN CIENCIAS DE LA EDUCACIÓN":"LIC. EN C. DE LA EDUCACIÓN",
    "LICENCIATURA EN INFORMÁTICA (UNAM)":"LIC. EN INFORMÁTICA",
    "LICENCIATURA EN LENGUA INGLESA":"LIC. EN LENGUA INGLESA",
    "MAESTRÍA EN GESTIÓN OPERACIÓN ADUANERA":"MAESTRÍA EN GESTIÓN OPE ADU",
    "MAESTRÍA EN DERECHO FAMILIAR":"MAESTRÍA EN DERECHO FAMILIAR",
    "MAESTRÍA EN FISCAL":"MAESTRÍA EN FISCAL",
    "MAESTRÍA EN INVESTIGACIÓN EDUCATIVA":"MAESTRÍA EN INVESTIGACIÓN EDU.",
    "INGENIERIA MECANICA AUTOMOTRIZ":"ING. MECANICA AUTOMOTRIZ",
    "EGRESADOS":"EGRESADOS"
}
const tamplateOptions = {
    'student':'studentTemplates',
    'teacher':'teacherTemplates',
    'collaborator':'collaboratorTemplates',
}
const FrontId = ({item}) => {
    const { image } = useGetPersonImg(item.idClient);
    const { imgFront } = useContext(IdTamplatesContext)[tamplateOptions[item.typeClient]];
    return (
        <figure className='box-front-id'>
            {imgFront 
                ? <img className='tamplate-front' src={`data:image/jpeg;base64,${imgFront}`} alt='img id' /> 
                : <NotFountTamplate />
            } 
            <img className='img-Studen' src={image} alt='img' />
            <div className='box-name'>
                <p className='name'>{item.name}</p>
                <p className='name'>{item.firstname}</p>
                <p className='name'>{item.lastname}</p>
            </div>
            {item.typeClient === 'student' &&
                <div className='isStuding'>
                    <p>{sections[item.seccion]}</p>
                </div>
            }
            <div className='mtc'>
                <p>{item.idClient}</p>
            </div>
        </figure>
    );
}
export default FrontId;

