import './actions.css';
const Actions = ({section}) => (
    <div className="actions">
        <button className='btn-select-studens'><span style={{textTransform:'capitalize'}}>{section.all}</span> seleccionados</button>
        <button>Agregrar {section.one}</button>
    </div>
)
export default Actions;