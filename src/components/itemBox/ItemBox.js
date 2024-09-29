import { useState, useLayoutEffect, useContext } from 'react';
import { useGetPersonImg } from '../../hooks/useGetPersonImg';
import MenuPoint from '../menuPoint/MenuPoint';
import GenerateIdContext from '../../context/generateId/GenerateIdContext';
import ModalShowPersonContext from '../../context/modalShowPerson/ModalShowPersonContext';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import './itemBox.css';
const typesPerson = {
    STUDENT:'Alumno',
    TEACHER:'Profesor',
    COLLABORATOR:'Colaborador'
}
const ItemBox = ({ item, remove }) => {
    const [ isSelected, setIsSelected ] = useState(false);
    const { setShowPerson, setPersonInfo } = useContext(ModalShowPersonContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { generateIdState, addSelectedPerson, removeSelectedPerson } = useContext(GenerateIdContext);
    const { selectedPersons } = generateIdState;
    const { idPerson, name, firstname, lastname, typePerson, avatar } = item;
    const { image } = useGetPersonImg(idPerson);
    useLayoutEffect(() => {
        const getSelectedPerson = selectedPersons.find(item => item.idPerson === idPerson);
        setIsSelected(getSelectedPerson ? true : false);
    },[idPerson, selectedPersons]);
    const action = () => {
        setPersonInfo(item);
        setShowPerson(true);
    }
    const select = () => {
        if(selectedPersons.length === 10 && !isSelected) {
            return openCentralAlert( 
                'Limite alcanzado',
                `No se pueden seleccionar más, ya que se alcanzó el límite de 10 personas.`, 
                'error'
            );
        }
        if(!isSelected) addSelectedPerson(item);
        if(isSelected) {
            const result = selectedPersons.filter(item => item.idPerson !== idPerson);
            removeSelectedPerson(result);
        }
        setIsSelected(!isSelected);
    }
    const confirmDeletion = () => {
        openCentralAlert( 
            'Eliminar',
            `¿Seguro que quieres eliminar este ${typesPerson[typePerson]}?`, 
            'confirm',
            () => remove(idPerson)
        );
    }
    return (
        <div className='item-box'>
            <div className={`card ${isSelected && 'selected'}`}>
                <div className="menu">
                    <MenuPoint
                        options={
                            [{name:'see', value:'Ver', title:false, action:action},
                            {name:'delete', value:'Eliminar', title:false, action:confirmDeletion}]
                        }
                    />
                </div>
                <div className="box-avatar">
                    {!image ?
                        <div className="avatar" style={{background:avatar}}>
                            <span>{name.replace(/\s/g,'')[0]}</span>
                        </div>
                        :
                        <figure className='box-img'>
                            <img src={image} alt='Img para credencial' className='img' />
                        </figure>
                    }
                </div>
                <div className="type">
                    <span>{typesPerson[typePerson]}</span>
                </div>
                {image &&
                    <button className='btn-select' onClick={() => select()}>
                        {isSelected ? 'Deseleccionar' : 'Seleccionar'}
                    </button>
                }
            </div>
            <div className="info">
                <p>{name} {firstname} {lastname}</p>
                <span>{idPerson}</span>
            </div>
        </div>
    );
}
export default ItemBox;