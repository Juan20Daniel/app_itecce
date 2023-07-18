import './itemInfoExcel.css';
const ItemInfoExcel = ({ icon, name, value }) => {
    return (
        <div className='itemInfoExcel'>
            <img src={icon} alt="Icon document" className='itemInfoExcel__icon' />
            <p className='value'>{name} : {value}</p>
        </div>
    )
}

export default ItemInfoExcel;