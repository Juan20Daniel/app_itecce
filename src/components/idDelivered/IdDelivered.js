import './idDelivered.css';
import iconEdit from '../../assets/iconEdit.png';
const IdDelivered = () => {
    return (
        <div className='Id-delivered'>
            <span className='Id-delivered__title'>Entregada</span>
            <div className='Id-delivered__box-date'>
                <span className='Id-delivered__box-date--date'>Fecha de entrega: 23/09/2023</span>
                <button className='Id-delivered__box-date--btn-edit'>
                    <img className='icon-edit' src={iconEdit} alt="icon de editar" />
                </button>
            </div>
        </div>
    )
}
export default IdDelivered;