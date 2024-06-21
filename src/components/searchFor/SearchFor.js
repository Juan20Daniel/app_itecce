import { memo } from 'react';
import './searchForStyles.css';
import iconSearch from '../../assets/iconSearch.png';
import MenuPoint from '../menuPoint/MenuPoint';
import { SearchFormViewModel } from './searchForViewModel';
import {IconX} from '../../assets/iconX.js';
import { IconNext } from '../../assets/IconNext.js';
const SearchFor = ({
    idToSearch,
    nameToSearch,
    firstnameToSearch,
    lastnameToSearch,
    searchBy,
    isSearching,
    setSearchBy,
    setIdToSearch,
    setNameToSearch,
    setFirstnameToSearch,
    setLastnameToSearch,
    clearSearchInputs,
    children
}) => {
    const { btnLeft, btnRigth, fullname, searchOption, increment, decrement} = SearchFormViewModel(searchBy, setSearchBy, clearSearchInputs);

    return (
        <div className='search'>
            <div className={`content ${isSearching && 'is-searching'}`}>
                <div className='box-icon'>
                    <img src={iconSearch} alt="Icono de busqueda" />
                </div>
                <MenuPoint options={[
                    {name:'', value:'Buscar por', title:true, action:searchOption},
                    {name:'search-by-id', value:'Matrícula', title:false, action:searchOption},
                    {name:'search-by-name', value:'Nombre completo', title:false, action:searchOption}
                ]} />
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
                    <div className='box-btn-clear-input'>
                        {isSearching && 
                            <button onClick={() => clearSearchInputs()} className='btn-clear-input' title='Limpiar'>
                                <IconX size={16} />
                            </button>
                        }
                    </div>
                </div>
           </div>
            {isSearching && 
                <div className='results'>
                    {children}
                </div>
            }
        </div>
      
    );
}
export default memo(SearchFor);