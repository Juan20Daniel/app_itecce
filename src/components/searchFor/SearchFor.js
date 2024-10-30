import { useState } from "react";
// import { IconX } from '../../assets/iconX.js';
import iconSearch from '../../assets/iconSearch.png';
import './searchForStyles.css';
const SearchFor = () => {
    const [idToSearch, setIdToSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    return (
        <div className='search'>
            <div className={`content ${isSearching && 'is-searching'}`}>
                <div className='box-icon'>
                    <img src={iconSearch} alt="Icono de busqueda" />
                </div>
                <div className='box-input'>
                    <input 
                        type='text' 
                        className='input-id' 
                        placeholder='Matrícula' 
                        value={idToSearch} 
                        onChange={(e) => setIdToSearch(e.target.value)}
                    />
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