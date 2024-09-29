import { useState, useContext, useEffect } from 'react';
import { useGetPersonImg } from '../../../../hooks/useGetPersonImg';
import imgStudent from '../../../../assets/studens.jpg';
import imgTeacher from '../../../../assets/teachers.jpg';
import imgCollaborator from '../../../../assets/collaborators.jpg';
import imgReverse from '../../../../assets/reverse.jpg';
import GenerateIdContext from '../../../../context/generateId/GenerateIdContext';
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
const fontImg = {
    'STUDENT':imgStudent,
    'TEACHER':imgTeacher,
    'COLABORATOR':imgCollaborator,//cambiar a collaborator
    'REVERSE':imgReverse
}
const FrontId = ({item}) => {
    console.log(item)
    const [ schoolSection, setSchoolSection ] = useState(null);
    const { generateIdState } = useContext(GenerateIdContext);
    const { infoSchool } = generateIdState;
    const { image } = useGetPersonImg(item.idPerson);

    useEffect(() => {
        if(item.typePerson === "STUDENT") {
            const resultInfo = infoSchool.filter(info => info.idPerson_info === item.idPerson);
            if(resultInfo.length !== 0) setSchoolSection(resultInfo[0].seccion);
        }
    },[item.idPerson, infoSchool, schoolSection, item.typePerson]);
    return (
        <figure className='box-front-id'>
            <img className='front-id-img' src={fontImg[item.typePerson]} alt='img id' />     
            <img className='img-Studen' src={image} alt='img' />
            <div className='box-name'>
                <p className='name'>{item.name}</p>
                <p className='name'>{item.firstname}</p>
                <p className='name'>{item.lastname}</p>
            </div>
            {item.typePerson === "STUDENT" &&
                <div className='isStuding'>
                    <p>{sections[schoolSection]}</p>
                </div>
            }
            <div className='mtc'>
                <p>{item.idPerson}</p>
            </div>
        </figure>
    );
}
export default FrontId;

