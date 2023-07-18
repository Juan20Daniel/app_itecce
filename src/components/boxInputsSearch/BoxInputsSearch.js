import { useState } from 'react';
import './boxInputsSearch.css';
import iconSearch from '../../assets/iconSearch.png';
import iconBack from '../../assets/iconBack.png';
import iconX from '../../assets/iconX.png';
import { select } from '../../functions';
var count = 1;
const BoxInputsSearch = ({ 
    selectSearch,
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
    const [ selectInput, setSelectInput ] = useState([
        { id:1, active:true },
        { id:2, active:false },
        { id:3, active:false },
    ]);
    const handleChangeInputToLeft = () => {
        if(count > 1) count = count - 1;
        const result =  select(selectInput, count);
        setSelectInput(result);
    };
    const handleChangeInputToRight = () => {
        if(count < 3) count = count + 1;
        const result =  select(selectInput, count);
        setSelectInput(result);
    };
    return (
        <div className="inputs-search">
            {selectSearch === "names" &&
                <div className='inputs'>
                    <button className='btn-change-input-left' onClick={() => handleChangeInputToLeft()}>
                        <img src={iconBack} alt="icon change" />
                    </button>
                    <input 
                        className={`input-search input-search-name ${selectInput[0].active && "input-search-active"}`} 
                        placeholder='Nombre'
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <span className='place'>|</span>
                    <input 
                        className={`input-search input-search-firstname ${selectInput[1].active && "input-search-active"}`} 
                        placeholder='Apellido paterno'
                        value={searchFirstname}
                        onChange={(e) => setSearchFirstname(e.target.value)}
                    />
                    <span className='place'>|</span>
                    <input 
                        className={`input-search input-search-lastname ${selectInput[2].active && "input-search-active"}`} 
                        placeholder='Apellido materno'
                        value={searchLastname}
                        onChange={(e) => setSearchLastname(e.target.value)}
                    />
                    <button className='btn-change-input-right' onClick={() => handleChangeInputToRight()}>
                        <img src={iconBack} alt="icon change" />
                    </button>
                </div>
            }
            {selectSearch === "id" &&
                <input 
                    className='input-search margin-right' 
                    placeholder='Ingresa una mátricula'
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
            }
            {selectSearch === "user_name" &&
                <input 
                    className='input-search margin-right' 
                    placeholder='Ingresa un nombre de usuario'
                    value={searchUserName}
                    onChange={(e) => setSearchUserName(e.target.value)}
                />
            }
           
            <div className='box-icon-search'>
                <button
                    onClick={() => clearInputsSearch()}
                    className={`
                        ${showBtnClearInputs.size > 1 && "show-btn-clear-inputs"}
                        btn-clear-inputs 
                        ${(selectSearch === "user_name" || selectSearch === "id") && "turn-right"}
                    `}
                >
                    <img src={iconX} alt="icon close img"/>
                </button>
                <img src={iconSearch} alt="Icono de buscar." />
            </div>
        </div>
    )
}

export default BoxInputsSearch;