import './searchForStyles.css';
import iconSearch from '../../assets/iconSearch.png';
import iconX from '../../assets/iconX.png';
const SearchFor = () => {
    return (
        <div className='search'>
            <div className='box-icon'>
                <img src={iconSearch} alt="Icono de busqueda" />
            </div>
            <input placeholder='Buscar alumno' />
            <button className='btn-clear-input' title='Limpiar'>
                <img src={iconX} alt="Icono x" />
            </button>
        </div>
      
    );
}
export default SearchFor;