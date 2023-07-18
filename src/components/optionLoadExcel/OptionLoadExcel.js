import './optionLoadExcel.css';
import { select } from '../../functions';
const OptionLoadExcel = ({ type, ilustration, id, active, typeListSelected, setTypeListSelected }) => {
    const selectOp = () => setTypeListSelected(select(typeListSelected, id));
    return (
        <li className={`optionLoadExcel ${active && "optionLoadExcel-active"}`}>
            <button onClick={() => selectOp()}>
                {active &&
                <span className='optionLoadExcel-op-selected'>Seleccionado</span>
                }
                <figure className='box-ilustration-Op'>
                    <img className='ilustration-Op' src={ilustration} alt="Ilustration option" />
                </figure>
                <span className='optionLoadExcel-name'>{type}</span>
            </button>
        </li>
    );
}

export default OptionLoadExcel;