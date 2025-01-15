import Spin from '../spin/Spin';
import './btnAction.css';
const BtnAction = ({ value, color, action, type='button', isLoading=false }) => {
    return (
        <>
            {type !== 'submit' ?
                <button 
                    className={`btn-action ${color}`} 
                    onClick={() => action()}
                    type={type}
                >
                    {isLoading
                        ? <Spin size={15} color='white' />
                        : <span>{ value }</span>
                    }
                </button>
            :
                <button 
                    className={`btn-action ${color}`} 
                    type='submit'
                >
                    {isLoading
                        ? <Spin size={15} color='white' />
                        : <span>{ value }</span>
                    }
                </button>
                
            }
        </>
    );
}

export default BtnAction;