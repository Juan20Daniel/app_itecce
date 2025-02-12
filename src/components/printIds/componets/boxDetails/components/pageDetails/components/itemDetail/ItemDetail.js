import './itemDetail.css';
const ItemDetail = ({label, value}) => (
    <li className="item-detail">{label}: 
        <span className='item-detail-value'>
            {value}
        </span>
    </li>
);

export default ItemDetail;