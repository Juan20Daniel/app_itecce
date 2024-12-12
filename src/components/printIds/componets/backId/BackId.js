import { useContext } from 'react';
import BoxInfoPerson from './components/boxInfoPerson/BoxInfoPerson';
import InputExpireDate from './components/inputExpireDate/InputExpireDate';
import IdTamplatesContext from '../../../../context/idTamplates/IdTamplatesContext';
import './backId.css';
const tamplateOptions = {
    'student':'studentTemplates',
    'teacher':'teacherTemplates',
    'collaborator':'collaboratorTemplates',
}
const BackId = ({item, position, hideStyles}) => {
    const { imgReverse } = useContext(IdTamplatesContext)[tamplateOptions[item.typeClient]];
    return (
        <div className={`box-back-id box-${position}`}>
            <img
                className='back-id-img' 
                src={`data:image/jpeg;base64,${imgReverse}`} alt='img id'
            />
            {!hideStyles.current && 
                <BoxInfoPerson item={item} />    
            }
            <InputExpireDate
                item={item}
                hideStyles={hideStyles}
            />
        </div>
    )
}

export default BackId;