import './itemInfo.css';
const ItemInfo = ({ title, value, children }) => {
    return (
        <div className='item-info'>
            {children}
            <div className='box-info'>
                <span className='title-info'>{title}</span>
                <span className='value-info'>{value}</span>
            </div>
        </div>
    );
}

export default ItemInfo;