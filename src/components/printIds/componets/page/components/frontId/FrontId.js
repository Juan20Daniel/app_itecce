import { useContext } from 'react';
import { useGetPersonImg } from '../../../../../../hooks/useGetPersonImg';
import IdTamplatesContext from '../../../../../../context/idTemplates/IdTemplatesContext';
import NotFoundTemplate from '../../../../../notFoundTemplate/NotFoundTemplate';
import CareersContext from '../../../../../../context/careers/CareersContext';
import './frontId.css';

const tamplateOptions = {
    1:'studentTemplates',
    2:'teacherTemplates',
    3:'collaboratorTemplates',
}
const FrontId = ({item}) => {
    const { image } = useGetPersonImg(item.idClient);
    const { imgFront } = useContext(IdTamplatesContext)[tamplateOptions[item.idSectionClients]];
    const { careers } = useContext(CareersContext);
    return (
        <figure className='box-front-id'>
            {imgFront 
                ?   <img className='tamplate-front' src={`data:image/jpeg;base64,${imgFront}`} alt='img id' /> 
                :   <NotFoundTemplate />
            } 
            <img className='img-Studen' src={image} alt='img' />
            <div className='box-name'>
                <p className='name'>{item.name}</p>
                <p className='name'>{item.firstname}</p>
                <p className='name'>{item.lastname}</p>
            </div>
            {item.idSectionClients === 1 &&
                <div className='isStuding'>
                    <p>{careers.find(career => career.idCareer===item.idCareer).abridging}</p>
                </div>
            }
            <div className='mtc'>
                <p>{item.idClient}</p>
            </div>
        </figure>
    );
}
export default FrontId;

