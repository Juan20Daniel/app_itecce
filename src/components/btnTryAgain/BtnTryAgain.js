import Button from '../button/Button';
import './btnTryAgain.css';
const BtnTryAgain = ({action}) => (
    <div className='box-btn-try-again'>
        <Button
            value='Volver a intentar'
            color='gray'
            btnStyle='btn-try-again'
            action={action}
        />
    </div>
)

export default BtnTryAgain;