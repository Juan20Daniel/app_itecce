import Button from '../button/Button';
import Spin from '../spin/Spin';
import './btnSetting.css';
const BtnSetting = ({value, type, action, isLoading, children}) => {
    return (
        <div className="box-btn-settings">
            <Button
                value={value} 
                type={type} 
                btnStyle='btn-with-icon'
                action={action}
                colorSpinner="#000000"
            >
                {isLoading
                    ? <Spin size={16} color='#000000' />
                    : <span>{value}</span>
                }
                {children}
            </Button>
        </div>
    );
}
export default BtnSetting;