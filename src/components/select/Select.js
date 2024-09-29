import { useState, useEffect, useRef } from 'react';
import { IconDown } from '../../assets/IconDown';
import './select.css';
const Select = ({ state, setState, options:initialState, label }) => {
    const [ options, setOptions ] = useState(initialState??[]);
    const [ showOptions, setShowOptions ] = useState(false);
    const elementRef = useRef(null);
    useEffect(() => {
        document.addEventListener('mousedown', hideOptions);
        return () => {
            document.removeEventListener('mousedown', hideOptions);
        }
    },[]);
    useEffect(() => {
        const opSelected = options.find(item => item.selected);
        if(opSelected) setState(state => ({...state, value:opSelected.name}));
        else setState(state => ({...state, value:''}));
    },[label, options, setState]);
    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    }
    const hideOptions = (ev) => {
        if(elementRef.current && !elementRef.current.contains(ev.target)) {
            setShowOptions(false);
        }
    }
    const handleValue = (option) => {
        setState({...state, value:option.name});
        setOptions(options.map(item => item.id === option.id ? {...item, selected:true} : {...item, selected:false}));
        handleShowOptions();
    }
    return (
        <div className="select" ref={elementRef}>
            <button className='btn-show-op' type='button' onClick={() => handleShowOptions()}>
                <p>{state.value === '' ? label : state.value}</p>
                <IconDown size={24} />
            </button>
            {showOptions &&
                <ul className='select-options'>
                    {options.map(option => (
                        <li className='select-option' key={option.id}>
                            <button
                                type='button'
                                className={`${option.selected && 'active'}`}
                                onClick={() => handleValue(option)}
                            >
                                {option.name}
                            </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

export default Select;