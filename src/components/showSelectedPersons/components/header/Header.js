import { useContext } from 'react';
import { IconX } from '../../../../assets/iconX';
import GenerateIdContext from '../../../../context/generateId/GenerateIdContext';
import BtnDiselect from '../../../btnDiselect/BtnDiselect';
import BtnRegisterDate from '../btnRegisterDate/BtnRegisterDate';
import './header.css';
const Header = () => {
    const { generateIdState, modalSelectedPersons } = useContext(GenerateIdContext);
    const { selectedPersons } = generateIdState;
    return (
        <div className='header'>
            <div className='box-title'>
                <h3 className='title'>Lista de personas</h3>
                <button className='btn-close' title='Cerrar' onClick={() => modalSelectedPersons(false)}>
                    <IconX  size={20}/>
                </button>
            </div>
            <p className='text'>Todas las personas seleccionadas y listas para
                crear credencial <b>{selectedPersons.length}/10</b>.
            </p>
            <div className='box-btns'>
                <BtnDiselect value='Quitar todo' />
                <BtnRegisterDate />
            </div>
        </div>
    );
}

export default Header;