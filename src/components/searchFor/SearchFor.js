import './searchForStyles.css';
import iconSearch from '../../assets/iconSearch.png';
import MenuPoint from '../menuPoint/MenuPoint';
import { SearchFormViewModel } from './searchForViewModel';
import {IconX} from '../../assets/iconX.js';
import { IconNext } from '../../assets/IconNext.js';
const SearchFor = () => {
    const {optionSelected, btnLeft, btnRigth, fullname, searchOption, increment, decrement} = SearchFormViewModel();
    return (
        <div className='search'>
            <div className='box-icon'>
                <img src={iconSearch} alt="Icono de busqueda" />
            </div>
            <MenuPoint options={[
                {name:'', value:'Buscar por', title:true, action:searchOption},
                {name:'id', value:'Matrícula', title:false, action:searchOption},
                {name:'fullname', value:'Nombre completo', title:false, action:searchOption}
            ]} />
            <div className='box-input'>
                {optionSelected === 'id' ?
                    <input type='text' className='input-id' placeholder='Matrícula' />
                    :
                    <div className='box-fullname'>
                        <button type='button' className='btn-next' title='Cambiar' onClick={decrement}>
                            <IconNext size={8} color={btnLeft ? 'black' : '#d2d2d2'} />
                        </button>
                        <input type='text' className={`input-name ${fullname[0].active && 'show'}`} placeholder='Nombre' />
                        <div className='divider' />
                        <input type='text' className={`input-firstname ${fullname[1].active && 'show'}`} placeholder='Apellido paterno' />
                        <div className='divider' />
                        <input type='text' className={`input-lastname ${fullname[2].active && 'show'}`} placeholder='Apellido materno' />
                        <button type='button' className='btn-next btn-rotate' title='Cambiar' onClick={increment}>
                            <IconNext size={8} color={btnRigth ? 'black' : '#d2d2d2'} />
                        </button>
                    </div>
                }
                {false && <button className='btn-clear-input' title='Limpiar'>
                    <IconX size={16} />
                </button>}
            </div>
        </div>
      
    );
}
export default SearchFor;