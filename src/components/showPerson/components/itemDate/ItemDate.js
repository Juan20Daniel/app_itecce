import { reverseText } from '../../../../helpers/helpers';
import BtnAction from '../../../btnAction/BtnAction';
import './itemDate.css';
const ItemDate = ({ title, value, date, note, openModal, children }) => {
    return (
        <div className='item-date'>
            <p className="date-title">{title}</p>
            <div className="box-date">
                <p>{value}</p>
                {date && 
                    <p className="date">{reverseText(date).replace(/,/g,'/')}</p>
                }
                <div className='box-btn'>
                    <BtnAction 
                        value={date ? 'Editar' : 'Agregar'} 
                        color='blue'
                        action={() => openModal(true)}
                    />
                </div>
                {children}
            </div>
            {!date &&
                <p className='note'>{note}</p>
            }
        </div>
    );
}

export default ItemDate;
