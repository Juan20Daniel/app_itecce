import './inputGroupCareer.css';

const InputGroupCareer = ({id, label, type, active, valueInput, setValue, spanValue}) => {
    return (
        <div className='input-career'>
            <label htmlFor={id}>{label}:</label>
            {active
                ?   <input
                        id={id}
                        type={type}
                        value={valueInput}
                        onChange={(e) => setValue(e.target.value)}
                    />
                :   <span>{spanValue}</span>
            }
        </div>
    );
}

export default InputGroupCareer;