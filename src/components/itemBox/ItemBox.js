import { useContext } from 'react';
import MenuPoint from '../menuPoint/MenuPoint';
import ShowPersonContext from '../../context/showPerson/ShowPersonContext';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import './itemBox.css';
const typesPerson = {
    STUDENT:'Alumno',
    TEACHER:'Profesor',
    COLLABORATOR:'Colaborador'
}
const ItemBox = ({ item, remove }) => {
    const { setShowPerson, setPersonInfo } = useContext(ShowPersonContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { idPerson, name, firstname, lastname, typePerson, avatar } = item;
    const showInfo = () => {
        setPersonInfo(item);
        setShowPerson(true);
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
        <div className="item-box">
            <div className="card">
                <div className="menu">
                    <MenuPoint options={[{name:'delete', value:'Eliminar', title:false, action:confirmDeletion}]} />
                </div>
                <div className="box-avatar">
                    <div className="avatar" style={{background:avatar}}>
                        <span>{name.replace(/\s/g,'')[0]}</span>
                    </div>
                </div>
                <div className="type">
                    <span>{typesPerson[typePerson]}</span>
                </div>
                <button className="btn-select" onClick={() => showInfo()}>
                    VER
                </button>
            </div>
            <div className="info">
                <p>{name} {firstname} {lastname}</p>
                <span>{idPerson}</span>
            </div>
        </div>
    );
}
export default ItemBox;