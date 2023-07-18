import './itemInfoStyles.css';
const ItemInfo = ({ icon, alt, title, value }) => {
    return (
        <div className='item-info'>
            <img className='item-info__icon' src={icon} alt={alt} />
            <div className='item-info__info'>
                <span className='item-info__info--title'>{title}</span>
                <span className='item-info__info--value'>{value}</span>
            </div>
        </div>
    );
}

export default ItemInfo;