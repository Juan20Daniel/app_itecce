import Button from '../../../button/Button';
import './btnAuth.css';

const BtnAuth = ({value, isLoading}) => (
    <div className='box-btn-auth'>
        <Button
            value={value}
            type='submit'
            btnStyle='btn-auth'
            isLoading={isLoading}
        />
    </div>
);

export default BtnAuth;