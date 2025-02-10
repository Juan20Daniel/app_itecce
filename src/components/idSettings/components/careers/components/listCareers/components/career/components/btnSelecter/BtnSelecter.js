import { useContext } from 'react';
import { IconCheckbox } from '../../../../../../../../../../assets/IconCheckbox';
import { IconCheckboxSelected } from '../../../../../../../../../../assets/IconCheckboxSelected';
import CareersContext from '../../../../../../../../../../context/careers/CareersContext';
import './btnSelecter.css';

const BtnSelecter = ({ idInput, active }) => {
    const { selectCareer } = useContext(CareersContext);
    const selectInput = () => {
        selectCareer(idInput);
    }
    return (
       <div className='box-btn-select'>
            <button
                type='button'
                onClick={() => selectInput()}
                className='btn-select'
            >
                {active 
                    ?   <IconCheckboxSelected />
                    :   <IconCheckbox />
                }
            </button>
       </div>
    );
}

export default BtnSelecter;