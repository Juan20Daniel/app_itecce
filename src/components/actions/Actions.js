import './actions.css';
const Actions = ({section}) => (
    <div className="actions">
        <button className='btn-select-studens'>Seleccinar {section.all}</button>
        <button>Agregrar {section.one}</button>
    </div>
)
export default Actions;