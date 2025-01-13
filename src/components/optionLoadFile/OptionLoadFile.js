import './optionLoadFile.css';
import { select } from '../../helpers/select';
const OptionLoadFile = ({ type, ilustration, id, active, options, setOptions }) => {
    const selectOption = () => setOptions(select(options, id));
    return (
        <li className={`option ${active && "option-active"}`}>
            <button onClick={() => selectOption()}>
                {active &&
                    <span className='marker'>Seleccionado</span>
                }
                <div className='box-ilustration'>
                    <img className='ilustration' src={ilustration} alt="Ilustración" />
                </div>
                <span className='option-name'>{type}</span>
            </button>
        </li>
    );
}
export default OptionLoadFile;