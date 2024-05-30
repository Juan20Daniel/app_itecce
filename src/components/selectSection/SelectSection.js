import './selectSection.css';
const SelectSection = ({selectSection, setSelectSection}) => (
        <select className='select-type' title="Seleccionar tipo" value={selectSection} onChange={(e) => setSelectSection(e.target.value)}>
        <option value='students'>Alumnos</option>
        <option value='teachers'>Profesores</option>
        <option value='collaborators'>Colaboradores</option>
    </select>
);

export default SelectSection;