import { useContext } from 'react';
import { IconX } from '../../../../assets/iconX';
import SectionContext from '../../../../context/Section/SectionContext';
import './header.css';
const typeSection = {
    Alumnos:'alumno',
    Profesores:'profesor',
    Colaboradores:'colaborador'
}
const Header = ({setFormAddPerson}) => {
    const { sectionSelected } = useContext(SectionContext);
    return (
        <div className='header-form-add'>
            <div className='box-title'>
                <h3 className='title'>Agregar {typeSection[sectionSelected]}</h3>
                <button type='button' className='btn-close' title='Cerrar' onClick={() => setFormAddPerson(false)}>
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