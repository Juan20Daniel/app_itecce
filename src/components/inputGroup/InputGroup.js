import { useState } from 'react';
import { useInfoNavigator } from '../../hooks/useInfoNavigator';
import { IconShowPass } from '../../assets/IconShowPass';
import { IconHidePass } from '../../assets/IconHidePass';
import './inputGroup.css';
const InputGroup = ({
    id,
    inputStyle,
    placeholder='placeholder',
    type='text',
    camp={value:''},
    setValue,
    children
}) => {
    const [ showPass, setShowPass ] = useState(false);
    const { isEdge } = useInfoNavigator();
    return (
        <div className={`${inputStyle} ${(camp.name === 'password' && !isEdge) && 'pass'} ${camp.state === 'error' && 'input-err'}`}>
            {children}
            <input
                id={id}
                placeholder={placeholder} 
                value={camp.value} 
                type={!showPass ? type : 'text'}
                onChange={(e) => setValue({ ...camp, value:e.target.value })}
            />
            {(camp.name === 'password' && !isEdge) &&
                <button type="button" className='btn-show-pass' onClick={() => setShowPass(!showPass)}>
                    {showPass
                        ? <IconShowPass size={18} color="#979797"/>
                        : <IconHidePass size={18} color="#979797"/>
                    }
                </button>
            }
        </div>
    );
};
export default InputGroup;