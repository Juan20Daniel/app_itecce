import Button from '../button/Button';
import './btnRedirect.css';

const BtnRedirect = ({value, action}) => (
    <div className='box-btn-redirect'>
        <Button 
            value={value}
            type='button'
            btnStyle='btn-redirect-auth'
            action={action}
        />
    </div>
);


export default BtnRedirect;