import { useState } from 'react';
import Period from './components/period/Period';
import './validityPeriods.css';
const ValidityPeriods = () => {
    const [ students, setStudents ] = useState('NOV/25');
    const [ teachers, setTeachers ] = useState('DIC/24');
    const [ collaborators, setCollaborators ] = useState('DIC/24');
    return (
        <div className='validity-periods'>
            <span className="sub-title">Vigencia general</span>
            <Period 
                label='Alumnos'
                value={students}
                onChange={setStudents}
            />
            <Period
                label='Profesores'
                value={teachers}
                onChange={setTeachers}
            />
            <Period
                label='Colaboradores'
                value={collaborators}
                onChange={setCollaborators}
            />
        </div>
    );
}

export default ValidityPeriods;