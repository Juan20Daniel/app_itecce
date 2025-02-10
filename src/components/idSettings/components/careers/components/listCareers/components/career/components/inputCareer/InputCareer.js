import Button from '../../../../../../../../../button/Button';
import './inputCareer.css';

const InputCareer = ({id, value, setState, isLoading}) => {
    return (
        <div className='box-input'>
            <input
                type='text'
                id={id}
                value={value}
                onChange={(e) => setState(e.target.value)}
            />
            <Button 
                value='Guardar'
                type='submit'
                isLoading={isLoading}
                btnStyle='btn-save-change-career'
            />
        </div>
    );
}

export default InputCareer;