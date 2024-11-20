import { useState } from 'react';
import { useGetPersonImg } from '../../../../hooks/useGetPersonImg';
import imgReverse from '../../../../assets/reverse.jpg';
import './backId.css';

const BackId = ({item, position, hideStyles, defaultExpireDate}) => {
    const [ expireDate, setExpireDate ] = useState(defaultExpireDate);
    const { image } = useGetPersonImg(item.idPerson);
    const expiryDateEdited = (e) => { 
        setExpireDate(e.target.value)
    }
    return (
        <figure className={`box-back-id box-${position}`}>
            <img className='back-id-img' src={imgReverse} alt='img id' />
            {!hideStyles.current && 
                <div className='box-info-person'>
                    <img className='back-person-img' src={image} alt='img' />
                    <div className='box-info-school'>
                        <div className='back-mtc'>
                            <span><b>Matrícula</b></span>
                            <span>{item.idPerson}</span>
                        </div>
                        {item.group_student && 
                            <div className='back-mtc'>
                                <span><b>Grupo</b></span>
                                <span>{item.group_student}</span>
                            </div>
                        }
                    </div>
                </div>
            }
            <input 
                className={`expireId ${!hideStyles.current && 'input-edit-expire-date'}`} 
                value={expireDate} 
                onChange={(e) => expiryDateEdited(e)} 
                title={`Editar fecha de expiración ${expireDate}`}
            />
        </figure>
    );
}

export default BackId;