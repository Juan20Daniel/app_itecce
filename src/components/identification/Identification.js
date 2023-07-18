import { useState, useEffect } from 'react';
import './identificationStyles.css';
import iconStudent from '../../assets/iconStudent.png';
import iconMoreOptios from '../../assets/iconMoreOptios.png';
import { useSelector, useDispatch } from 'react-redux';
import { getIdToGenerate, activeAlert } from '../../redux/dataSlice';
import { updateProperty } from '../../functions';
const Identification = ({ data, setModalLoadImage, clients, setClients }) => {
    const [ select, setSelect ] = useState(false); 
    const [ menu, setMenu ] = useState(false);
    const { idToMake } = useSelector(state => state.credenciales);
    const dispatch = useDispatch();
    useEffect(() => {
        setSelect(data.isSelect);
    },[data.isSelect]);
    const selectIds = () => {
        if(data.nameImg === "NOT_IMG") return dispatch(activeAlert({ active:true, icon:'iconError', message:'La credencial no se puede generer sin una imagen.' }));
        if(select) {
            setSelect(!select);
            setClients({error:false, data:{
                studens:updateProperty(clients.data.studens, data.idClient, !select),
                teachers:updateProperty(clients.data.teachers, data.idClient, !select),
                collaborators:updateProperty(clients.data.collaborators, data.idClient, !select)
            }})
            const result = idToMake.filter(id => id.idClient !== data.idClient);
            return dispatch(getIdToGenerate(result));
        }
        if(idToMake.length === 10) return dispatch(activeAlert({ active:true, icon:'iconError', message:'Llegaste al limite, solo hay espacio para 10 credenciales en una hoja.' }));
        setClients({error:false, data:{
            studens:updateProperty(clients.data.studens, data.idClient, !select),
            teachers:updateProperty(clients.data.teachers, data.idClient, !select),
            collaborators:updateProperty(clients.data.collaborators, data.idClient, !select)
        }})
        setSelect(!select);
        return dispatch(getIdToGenerate([...idToMake, data]));
    } 
    return (
        <div className='box-identification'>
            <div className={`identification ${select && "isSelected"}`}>
                <picture className='identification__img'>
                    <img 
                        src={data.nameImg !== "NOT_IMG" ? `http://localhost:3000/${data.nameImg}` : iconStudent} 
                        alt="icono de persona" 
                        className='icon-aux' 
                    />
                </picture>
                <div className='identification__info'>
                    <div className='identification__info--box'>
                        <p className='ident-label-item'>Nombre</p>
                        <p className='ident-label-value'>{data.name} {data.firstname} {data.lastname}</p>
                    </div>
                    <div className='identification__info--box'>
                        <p className='ident-label-item'>Usuario algebraix</p>
                        <p className='ident-label-value'>{data.user_algeb}</p>
                    </div>
                    <div className='identification__info--box school-data'>
                        <p className='ident-label-item matric-label'>Matrícula</p>
                        <p className='ident-label-value matric'>{data.registration}</p>
                        <div className='ident-box-group'>
                            <p className='ident-group'>{data.group_studen}</p>
                        </div>
                    </div>
                </div>
                <div className='identification__buttons'>
                    <button className='identification__button btn-up-image' onClick={() => setModalLoadImage({ visible:true, infoStudent:data })}>
                        Ver alumno
                    </button>
                    <button className='identification__button btn-select' onClick={() => selectIds()}>
                        {select ? "Deseleccionar" : "Seleccionar"}
                    </button>
                </div>
                <button className='btn-menu-options' onClick={() => setMenu(!menu)}>
                    <img src={iconMoreOptios} alt="icono menu de opciónes" className='icon-menu-options'/>
                </button>
                {menu &&
                    <div className='ident-optons'>
                        <button>Modificar</button>
                        <button>Eliminar</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Identification;