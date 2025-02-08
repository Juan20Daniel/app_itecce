import Button from '../../../../../../../../../button/Button';
import './inputCareer.css';

const InputCareer = ({id, value, setState}) => {
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
                btnStyle='btn-save-change-career'
            />
        </div>
    );
}

export default InputCareer;