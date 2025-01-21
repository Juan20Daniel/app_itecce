import Spin from '../spin/Spin';
import './button.css';
const Button = ({ 
    value, 
    btnStyle, 
    action, 
    type='button',
    isLoading=false, 
    colorSpinner='white', 
    sizeSpinner=15,
    children
    }) => {
    const handleAction = () => {
        if(action) action();
    }
    return (
        <button 
            className={`btn ${btnStyle}`} 
            onClick={() => handleAction()}
            type={type}
        >
            {children 
                ? children
                : isLoading 
                    ? <Spin size={sizeSpinner} color={colorSpinner} />
                    : <span>{value}</span>
            }
        </button>
    );
}

export default Button;