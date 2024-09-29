import { useContext } from 'react';
import BtnDiselect from '../btnDiselect/BtnDiselect';
import GenerateIdContext from '../../context/generateId/GenerateIdContext';
import './actionButtonsGroup.css';
const typeSection = {
    students:'alumnos',
    teachers:'profesores',
    collaborators:'colaboradores'
}
const ActionButtonsGroup = ({section}) => {
    const { generateIdState, modalSelectedPersons, formAddPerson } = useContext(GenerateIdContext);
    const { selectedPersons } = generateIdState;
    return (
        <div className="action-buttons-group">
            {selectedPersons.length > 0 &&
                <>
                    <BtnDiselect value='Deseleccionar todos' />
                    <button className='btn-show-selecteds' onClick={() => modalSelectedPersons(true)}>
                        Ver seleccionados {selectedPersons.length}/10
                    </button>
                </>
            }
            <button className='btn-add-person' onClick={() => formAddPerson(true)}>Agregrar {typeSection[section]}</button>
        </div>
    )
}
export default ActionButtonsGroup;