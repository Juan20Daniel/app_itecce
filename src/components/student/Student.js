import './studentStyles.css';
import iconStudent from '../../assets/iconStudent.png';
const Student = ({ student }) => {
    return (
        <div className='student'>
            <div className='student__box-icon-studen'>
                <img src={iconStudent} alt="icon student" className='iconStudent' />
            </div>
            <div className='student__box-info'>
                <p className='label'>Nombre</p>
                <p>{student.Nombre} {student['Apellido paterno']} {student['Apellido materno']}</p>
                <div className='student__box-info--school'>
                    <div>
                        <p className='label'>Matricula</p>
                        <p className='mat'>{student['Matrícula']}</p>
                    </div>
                    <p className='student__box-info--school-group'>{student.Grupo}</p>
                </div>
                <p className='label user'>Usuario</p>
                <p>{student['Nombre de usuario']}</p>
            </div>
        </div>
    );
}

export default Student;