import { useState } from 'react';
import { useGetPersonImg } from '../../../../hooks/useGetPersonImg';
import imgReverse from '../../../../assets/reverse.jpg';
import './backId.css';

const BackId = ({item, position, hideStyles}) => {
    const [ expireDate, setExpireDate ] = useState('OCT/25');
    const { image } = useGetPersonImg(item.idPerson);
    const expiryDateEdited = (e) => { 
        setExpireDate(e.target.value)
    }
    return (
        <figure className={`box-back-id box-${position}`}>
            <img className='back-id-img' src={imgReverse} alt='img id' />
            {!hideStyles.current && 
                <>
                    <img className='back-person-img' src={image} alt='img' />
                    <div className='back-mtc'>
                        <p><b>Matrícula</b></p>
                        <p>{item.idPerson}</p>
                    </div>
                </>
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