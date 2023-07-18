import React, { useState } from "react";
import './pageToPrint.css';
import backIds from '../../assets/reverse.jpg';
import { getdataExpire } from '../../functions';
import { useSelector } from "react-redux";
const designIds = {
    student:require('../../assets/studens.jpg'),
    teacher:require('../../assets/teachers.jpg'),
    collaborator:require('../../assets/collaborators.jpg')
}
const sections = {
    "BACHILLERATO GENERAL":"NIVEL MEDIO SUPERIOR",
    "BACHILLERATO TÉCNICO EN SEGURIDAD PÚBLICA":"NIVEL MEDIO SUPERIOR",
    "BACHILLERATO TÉCNICO EN COMERCIO EXTERIOR":"NIVEL MEDIO SUPERIOR",
    "LICENCIATURA EN ADMINISTRACIÓN":"LIC EN ADMINISTRACIÓN",
    "LICENCIATURA EN ADUANAS Y COMERCIO EXTERIOR":"LIC EN ADUANAS Y COM EXT",
    "LICENCIATURA EN DISEÑO GRÁFICO":"LICENCIATURA EN DISEÑO GRÁFICO",
    "LICENCIATURA EN DERECHO":"LICENCIATURA EN DERECHO",
    "LICENCIATURA EN NUTRICIÓN":"LICENCIATURA EN NUTRICIÓN",
    "LICENCIATURA EN CONTABILIDAD":"LIC EN CONTABILIDAD",
    "LICENCIATURA EN CIENCIAS DE LA EDUCACIÓN":"LIC EN C. DE LA EDUCACIÓN",
    "LICENCIATURA EN INFORMÁTICA (UNAM)":"LICENCIATURA EN INFORMÁTICA",
    "LICENCIATURA EN LENGUA INGLESA":"LIC EN LENGUA INGLESA",
    "MAESTRÍA EN GESTIÓN OPERACIÓN ADUANERA":"MAESTRÍA EN GESTIÓN OPE ADU",
    "MAESTRÍA EN DERECHO FAMILIAR":"MAESTRÍA EN DERECHO FAMILIAR",
    "MAESTRÍA EN FISCAL":"MAESTRÍA EN FISCAL",
    "MAESTRÍA EN INVESTIGACIÓN EDUCATIVA":"MAESTRÍA EN INVESTIGACIÓN EDU."
}
const PageToPrint = React.forwardRef((props, ref) => {
    const { editExpireDate } = useSelector(state => state.credenciales);
    const {data, reverse, joinRverse} = props;
    return (
        <>
            {!joinRverse ?
                !reverse ?
                    <div ref={ref} className="printFrontId">
                        {data.map((data, index)=> {
                            return (
                                <FrontId key={index} data={data} />
                            );
                        })}
                    </div>
                    :
                    <div ref={ref} className="printBackId">
                        {data.map((data, index)=> {
                            return (
                                <ReverseId key={index} num={index} data={data} editExpireDate={editExpireDate} />
                            );
                        })}
                    </div>
                :
                <>
                    <div ref={ref} className="printFrontId">
                        {data.map((data, index)=> {
                            return (
                                <FrontId key={index} data={data} />
                            );
                        })}
                        {data.map((data, index)=> {
                            return (
                                <ReverseId key={index} num={index} data={data} editExpireDate={editExpireDate} />
                            );
                        })}
                    </div>
                </>
            }
        </>
    );
});

const FrontId = ({data}) => {
    console.log(data);
    return (
        <div className='frontId'>
            <img src={designIds.student} alt="Student" className='img'/>
            <div className='nameStudent'>
                <p className='name'>{data.name}</p>
                <p className='name'>{data.firstname}</p>
                <p className='name'>{data.lastname}</p>
            </div>
            {data.typeClient === "student" &&
                <div className='isStiding'>
                    <p>{sections[data.seccion]}</p>
                </div>
            }
            <div className='mtc'>
                <p>{data.registration}</p>
            </div>
            <img src={'http://localhost:3000/'+data.nameImg} alt="img" className='img-Studen' />
        </div>
    )
}

const ReverseId = ({num, data, editExpireDate}) => {
    const dataExpire = getdataExpire(data);
    const [ aux, setAux ] = useState(dataExpire);
    return (
        <div className={`reverseId ${"id"+num}`}>
            <img src={backIds} alt="Student" className='img'/>
            <span className="expireId">
                {!editExpireDate ?
                    aux
                    :
                    <input className="input-edit-expire-date" value={aux} onChange={(e) => setAux(e.target.value)} type="text" />
                }
            </span>
        </div>
    )
}

export default PageToPrint;