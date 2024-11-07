import { useContext } from 'react';
import { IconUser } from '../../assets/IconUser';
import { IconId } from '../../assets/IconId';
import ItemInfo from './components/itemInfo/ItemInfo';
import Header from './components/header/Header';
import SchoolData from './components/schoolData/SchoolData';
import IdentityInfo from './components/identityInfo/IdentityInfo';
import ShowPersonContext from '../../context/showPerson/ShowPersonContext';
import SectionContext from '../../context/Section/SectionContext';
import './showPerson.css';
const typeSection = {
    Alumnos:'alumno',
    Profesores:'profesor',
    Colaboradores:'colaborador'
}
const ShowPerson = () => {
    const {personInfo} = useContext(ShowPersonContext);
    const {sectionSelected} = useContext(SectionContext);
    const { idPerson, name, firstname, lastname } = personInfo;
    return (
        <div className='show-person'>
            <Header idPerson={idPerson} />
            <h2 className='title'>Información del {typeSection[sectionSelected]}</h2>
            <ItemInfo
                title={`Nombre del ${typeSection[sectionSelected]}`}
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
            {sectionSelected === 'Alumnos' &&
                <SchoolData
                    id={idPerson} 
                />
            }
            <IdentityInfo idPerson={idPerson} />
        </div>
    );
}

export default ShowPerson;