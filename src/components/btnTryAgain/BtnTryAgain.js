import BtnAction from '../btnAction/BtnAction';
import './btnTryAgain.css';
const BtnTryAgain = ({action}) => (
    <div className='box-btn-try-again'>
        <BtnAction
            value='Volver a intentar'
            color='gray'
            action={action}
        />
    </div>
)

export default BtnTryAgain;