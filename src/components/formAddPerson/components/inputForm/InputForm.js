import './inputForm.css';
const InputForm = ({type, state, setState, placeholder, messageError}) => {
    return (
        <div className="input-form">
            <input
                type={type}
                value={state.value} 
                onChange={(e) => setState({...state, value:e.target.value.toLocaleUpperCase()})}
                placeholder={placeholder}
                className="input"
            />
            {state.error &&
                <div className='box-message-error'>
                    <p className='error-message'>{messageError}</p>
                </div>
            }
        </div>
    );
}

export default InputForm;