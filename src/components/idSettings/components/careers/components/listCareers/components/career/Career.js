import { useState } from 'react';
import BtnSelecter from './components/btnSelecter/BtnSelecter';
import InputCareer from './components/inputCareer/InputCareer';
import CareerName from './components/careerName/CareerName';
import CareerAbridging from './components/careerAbridging/CareerAbridging';
import './career.css';

const Career = ({id, fullname, abridging, active}) => {
    const [ career, setCareer ] = useState(abridging);
    const handleSudmit = (e) => {
        e.preventDefault();
    }
    return (
        <li className='career'>
            <form onSubmit={handleSudmit} className='box-career'>
                <BtnSelecter idInput={id} active={active}  />
                <div className='input-career'>
                    <CareerName
                        id={id}
                        fullname={fullname}
                    />
                    {active
                        ? <InputCareer
                                id={id}
                                value={career}
                                setState={setCareer}
                            />
                        :   <CareerAbridging value={abridging} />
                    }
                </div>
            </form>
        </li>
    );
}

export default Career;