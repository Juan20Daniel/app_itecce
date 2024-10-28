import { useContext } from 'react';
import { IconUser } from '../../assets/IconUser';
import { IconId } from '../../assets/IconId';
import ItemInfo from './components/itemInfo/ItemInfo';
import Header from './components/header/Header';
import SchoolData from './components/schoolData/SchoolData';
import IdentityInfo from './components/identityInfo/IdentityInfo';
import ModalShowPersonContext from '../../context/modalShowPerson/ModalShowPersonContext';
import './showPerson.css';
const typeSection = {
    students:'alumno',
    teachers:'profesor',
    collaborator:'colaborador'
}
const ShowPerson = ({section}) => {
    const {personInfo} = useContext(ModalShowPersonContext);
    const { idPerson, name, firstname, lastname } = personInfo;
    return (
        <div className='show-person'>
            <Header idPerson={idPerson} />
            <h2 className='title'>Información del {typeSection[section]}</h2>
            <ItemInfo
                title={`Nombre del ${typeSection[section]}`}
                value={name+' '+firstname+' '+lastname}
            >
                <IconUser />
            </ItemInfo>
            <ItemInfo
                title="Matricula"
                value={idPerson}
            >
                <IconId />
            </ItemInfo>
            {section === 'students' &&
                <SchoolData
                    id={idPerson} 
                />
            }
            <IdentityInfo idPerson={idPerson} />
        </div>
    );
}

export default ShowPerson;