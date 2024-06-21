import { IconUser } from '../../../../assets/IconUser';
import { IconId } from '../../../../assets/IconId';
import { IconSection } from '../../../../assets/IconSection';
import { IconGroup } from '../../../../assets/IconGroup'; 
import ItemInfo from '../itemInfo/ItemInfo';
import Header from '../header/Header';
import './personInfo.css';
const PersonInfo = ({personInfo, setShowPerson}) => {
    const { idPerson, name, firstname, lastname } = personInfo;
    return (
        <div className='box-person-info'>
            <Header idPerson={idPerson} setShowPerson={setShowPerson} />
            <h2 className='title'>Información del alumno</h2>
            <ItemInfo
                title="Nombre del alumno"
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
            <ItemInfo
                title="Carrera"
                value='Carrera'
            >
                <IconSection />
            </ItemInfo>
            <ItemInfo
                title="Grupo"
                value='Grupo'
            >
                <IconGroup />
            </ItemInfo>
            {/* <ShowPrintDate />
            <IdDelivered /> */}
        </div>
    )
}

export default PersonInfo;