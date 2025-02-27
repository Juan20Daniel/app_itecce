import { useContext } from 'react';
import BoxInfoPerson from './components/boxInfoPerson/BoxInfoPerson';
import InputExpireDate from './components/inputExpireDate/InputExpireDate';
import IdTemplatesContext from '../../../../../../context/idTemplates/IdTemplatesContext';
import NotFoundTemplate from '../../../../../notFoundTemplate/NotFoundTemplate';
import './backId.css';
const tamplateOptions = {
    1:'studentTemplates',
    2:'teacherTemplates',
    3:'collaboratorTemplates',
}
const BackId = ({item, position, hideStyles}) => {
    const { imgReverse } = useContext(IdTemplatesContext)[tamplateOptions[item.idSectionClients]];
    return (
        <div className={`box-back-id box-${position}`}>
            {imgReverse 
                ?   <img className='back-id-img' src={`data:image/jpeg;base64,${imgReverse}`} alt='img id' />
                :   <NotFoundTemplate />
            }
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