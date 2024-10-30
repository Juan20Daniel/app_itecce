import { IconPoint } from '../../assets/IconPoint';
import './selectSection.css';
const SelectSection = ({data, total, selectSection}) => (
    <div className="box-select-type">
        <select className='select-type' title="Seleccionar tipo" value={selectSection}>
            <option value='students'>Alumnos</option>
            <option value='teachers'>Profesores</option>
            <option value='collaborators'>Colaboradores</option>
        </select>
        <IconPoint size={5} />
        <p>{data.length} de {total}</p>
    </div>
);

export default SelectSection;