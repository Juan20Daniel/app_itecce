import { useContext } from 'react';
import { IconX } from '../../assets/iconX';
import GenerateIdsContext from '../../context/generateIds/GenerateIdsContext';
import './itemImage.css';
const ItemImage = ({data}) => {
    const { removeImage } = useContext(GenerateIdsContext);
    return (
        <li className='item-image'>
            <img
                alt='img'
                key={data.idPerson}
                src={data.personImage}
            />
            <button type='button' onClick={() => removeImage(data.idPerson)} className='btn-remove-img' title='Quitar'>
                <IconX
                    size={10}
                    color='white'
                />
            </button>
        </li>
    );
}

export default ItemImage;