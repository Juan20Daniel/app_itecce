import { useContext } from 'react';
import { IconX } from '../../../../assets/iconX';
import HomeContext from '../../../../context/home/HomeContext';
import './header.css';
const typeSection = {
    students:'alumno',
    teachers:'profesor',
    collaborators:'colaborador'
}
const Header = ({section}) => {
    const { formAddPerson } = useContext(HomeContext);
    return (
        <div className='header-form-add'>
            <div className='box-title'>
                <h3 className='title'>Agregar {typeSection[section]}</h3>
                <button type='button' className='btn-close' title='Cerrar' onClick={() => formAddPerson(false)}>
                    <IconX  size={20}/>
                </button>
            </div>
            <p className='text'>
                Coloca la información correspondiente del {typeSection[section]} que se va a agregar.
            </p>
        </div>
    );
}

export default Header;