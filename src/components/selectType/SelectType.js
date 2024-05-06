import './selectType.css';
const SelectType = () => {
    return (
        <select className='select-type' title="Seleccionar tipo">
            <option>Alumnos</option>
            <option>Profesores</option>
            <option>Colaboradores</option>
        </select>
    );
}
export default SelectType;