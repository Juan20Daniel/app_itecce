import './selectSearchFor.css';
const SelectSearchFor = ({ setSelectSearch }) => {
    return (
        <div className="box-search__select">
            Buscar por:
            <select className='search__select' onChange={(e) => setSelectSearch(e.target.value)}>
                <option value="names">Nombre completo</option>
                <option value="id">Mátricula</option>
                <option value="user_name">Nombre de usuario</option>
            </select>
        </div>
    );
}

export default SelectSearchFor