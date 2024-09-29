import { useState } from 'react';
import { useInfoNavigator } from '../../hooks/useInfoNavigator';
import IconsSvg from '../../assets/IconsSvg';
import './inputGroup.css';
const InputGroup = ({ placeholder, camp, type, setValue, children }) => {
    const [ showPass, setShowPass ] = useState(false);
    const { isEdge } = useInfoNavigator();
    return (
        <div className={`input-group ${(camp.name === 'password' && !isEdge) && 'pass'} ${camp.state === 'error' && 'input-err'}`}>
            {children}
            <input 
                placeholder={placeholder} 
                value={camp.value} 
                type={!showPass ? type : 'text'}
                onChange={(e) => setValue({ ...camp, value:e.target.value })} 
            />
            {(camp.name === 'password' && !isEdge) && 
                <button type="button" className='btn-show-pass' onClick={() => setShowPass(!showPass)}>
                    <IconsSvg type={showPass ? "iconDontShow" : "showPass"} size={18} color="#979797" />
                </button>
            }
        </div>
    );
};
export default InputGroup;