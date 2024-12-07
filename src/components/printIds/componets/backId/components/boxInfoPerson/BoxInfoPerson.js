import { useGetPersonImg } from '../../../../../../hooks/useGetPersonImg';
import './boxInfoPerson.css';;
const BoxInfoPerson = ({item}) => {
    const { image } = useGetPersonImg(item.idClient);
    return (
        <div className='box-info-person'>
            <img className='back-person-img' src={image} alt='img' />
            <div className='box-info-school'>
                <div className='back-mtc'>
                    <span><b>Matrícula</b></span>
                    <span>{item.idClient}</span>
                </div>
                {item.groupStudent && 
                    <div className='back-mtc'>
                        <span><b>Grupo</b></span>
                        <span>{item.groupStudent}</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default BoxInfoPerson;