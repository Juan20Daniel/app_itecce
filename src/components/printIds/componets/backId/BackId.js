import imgReverse from '../../../../assets/reverse.jpg';
import BoxInfoPerson from './components/boxInfoPerson/BoxInfoPerson';
import InputExpireDate from './components/inputExpireDate/InputExpireDate';
import './backId.css';
const BackId = ({item, position, hideStyles}) => {
    return (
        <div className={`box-back-id box-${position}`}>
            <img
                className='back-id-img' 
                src={imgReverse} alt='img id'
            />
            {!hideStyles.current && 
                <BoxInfoPerson item={item} />    
            }
            <InputExpireDate
                item={item}
                hideStyles={hideStyles}
            />
        </div>
    )
}

export default BackId;