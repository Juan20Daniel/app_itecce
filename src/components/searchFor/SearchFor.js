import { useState } from "react";
import { select } from "../../functions";
// import { IconX } from '../../assets/iconX.js';
import { IconNext } from '../../assets/IconNext.js';
import iconSearch from '../../assets/iconSearch.png';
import MenuPoint from '../menuPoint/MenuPoint';
import './searchForStyles.css';
var count = 1;
const SearchFor = () => {
    const [idToSearch, setIdToSearch] = useState('');
    const [nameToSearch, setNameToSearch] = useState('');
    const [firstnameToSearch, setFirstnameToSearch] = useState('');
    const [lastnameToSearch, setLastnameToSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchBy, setSearchBy] = useState('search-by-id');
    const [ fullname, setFullname ] = useState([
        { id:1, active:true },
        { id:2, active:false },
        { id:3, active:false }
    ]);
    const [ btnLeft, setBtnLeft ] = useState(false);
    const [ btnRigth, setBtnRigth ] = useState(true);
    const searchOption = (option) => {
        if(option === '') return ;
        setSearchBy(option);
        if(searchBy === option) return;
        clearSearchInputs();
    }
    const increment = () => {
        if(count === 2) setBtnRigth(false);
        if(count === 3) return;
        count++;
        setFullname(select(fullname, count));
        if(count > 1) setBtnLeft(true);
    }
    const decrement = () => {
        if(count === 2) setBtnLeft(false);
        if(count === 1) return; 
        count--;
        setFullname(select(fullname, count));
        if(count < 3) setBtnRigth(true);
    }
    const clearSearchInputs = () => {
        console.log('clear')
    }
    return (
        <div className='search'>
            <div className={`content ${isSearching && 'is-searching'}`}>
                <div className='box-icon'>
                    <img src={iconSearch} alt="Icono de busqueda" />
                </div>
                <div className='box-menu-point'>
                    <MenuPoint options={[
                        {name:'', value:'Buscar por', title:true, action:searchOption},
                        {name:'search-by-id', value:'Matrícula', title:false, action:searchOption},
                        {name:'search-by-name', value:'Nombre completo', title:false, action:searchOption}
                    ]} />
                </div>
                <div className='box-input'>
                    {searchBy === 'search-by-id' ?
                        <input 
                            type='text' 
                            className='input-id' 
                            placeholder='Matrícula' 
                            value={idToSearch} 
                            onChange={(e) => setIdToSearch(e.target.value)}
                        />
                        :
                        <div className='box-fullname'>
                            <button type='button' className='btn-next' title='Cambiar' onClick={decrement}>
                                <IconNext size={8} color={btnLeft ? 'black' : '#d2d2d2'} />
                            </button>
                            <input 
                                type='text' 
                                className={`input-name ${fullname[0].active && 'show'}`} 
                                placeholder='Nombre'
                                value={nameToSearch} 
                                onChange={(e) => setNameToSearch(e.target.value.toUpperCase())}
                            />
                            <div className='divider' />
                            <input 
                                type='text' 
                                className={`input-firstname ${fullname[1].active && 'show'}`} 
                                placeholder='Apellido paterno'
                                value={firstnameToSearch} 
                                onChange={(e) => setFirstnameToSearch(e.target.value.toUpperCase())}
                            />
                            <div className='divider' />
                            <input 
                                type='text' 
                                className={`input-lastname ${fullname[2].active && 'show'}`} 
                                placeholder='Apellido materno'
                                value={lastnameToSearch} 
                                onChange={(e) => setLastnameToSearch(e.target.value.toUpperCase())}
                            />
                            <button type='button' className='btn-next btn-rotate' title='Cambiar' onClick={increment}>
                                <IconNext size={8} color={btnRigth ? 'black' : '#d2d2d2'} />
                            </button>
                        </div>
                    }
                    {/* {isSearching &&
                        <div className='box-btn-clear-input'>
                            <button onClick={() => clearSearchInputs()} className='btn-clear-input' title='Limpiar'>
                                <IconX size={16} />
                            </button>
                        </div>
                    } */}
                </div>
           </div>
        </div>
      
    );
}
export default SearchFor;