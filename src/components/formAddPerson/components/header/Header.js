import { useContext } from 'react';
import { IconX } from '../../../../assets/iconX';
import HomeContext from '../../../../context/home/HomeContext';
import './header.css';
const typeSection = {
    Alumnos:'alumno',
    Profesores:'profesor',
    Colaboradores:'colaborador'
}
const Header = () => {
    const { formAddPerson, homeState } = useContext(HomeContext);
    const { sectionSelected } = homeState;
    return (
        <div className='header-form-add'>
            <div className='box-title'>
                <h3 className='title'>Agregar {typeSection[sectionSelected]}</h3>
                <button type='button' className='btn-close' title='Cerrar' onClick={() => formAddPerson(false)}>
                    <IconX  size={20}/>
                </button>
            </div>
            <p className='text'>
                Coloca la información correspondiente del {typeSection[sectionSelected]} que se va a agregar.
            </p>
        </div>
    );
}

export default Header;