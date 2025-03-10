import { IconCheckbox } from '../../../../../../../../../../assets/IconCheckbox';
import { IconCheckboxSelected } from '../../../../../../../../../../assets/IconCheckboxSelected';
import './btnSelecter.css';

const BtnSelecter = ({ active, action }) => {
    return (
       <div className='box-btn-select'>
            <button
                type='button'
                onClick={() => action()}
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