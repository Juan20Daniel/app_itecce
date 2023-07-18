import './searchForStyles.css';
import SelectSearchFor from '../selectSearchFor/SelectSearchFor';
import BoxInputsSearch from '../boxInputsSearch/BoxInputsSearch';
const SearchFor = ({ 
    selectSearch, 
    setSelectSearch, 
    searchName,
    setSearchName,
    searchFirstname,
    setSearchFirstname,
    searchLastname,
    setSearchLastname,
    searchId,
    setSearchId,
    searchUserName,
    setSearchUserName,
    showBtnClearInputs,
    clearInputsSearch
}) => {
    return (
        <div className='search'>
            <SelectSearchFor setSelectSearch={setSelectSearch} />
            <BoxInputsSearch 
                selectSearch={selectSearch}
                searchName={searchName}
                setSearchName={setSearchName}
                searchFirstname={searchFirstname}
                setSearchFirstname={setSearchFirstname}
                searchLastname={searchLastname}
                setSearchLastname={setSearchLastname}
                searchId={searchId}
                setSearchId={setSearchId}
                searchUserName={searchUserName}
                setSearchUserName={setSearchUserName}
                showBtnClearInputs={showBtnClearInputs}
                clearInputsSearch={clearInputsSearch}
            />
        </div>
    );
}

export default SearchFor;