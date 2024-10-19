import BtnAction from '../../../btnAction/BtnAction';
import './optionsId.css';

const OptionsId = ({print}) => {
    return (
        <div className='options-id'>
            <button className='btn-add-date'>Registrar fecha de impresión</button>
            <button className='btn-show-reverse'>Ver reverso</button>
            <BtnAction 
                value='Imprimir'
                color='blue'
                action={print}
            />
        </div>
    );
}
export default OptionsId;