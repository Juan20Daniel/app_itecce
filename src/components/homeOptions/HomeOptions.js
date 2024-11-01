import { useContext, useState, useRef, useEffect } from "react";
import { getOptionsLocalStorage, saveOptionsLocalStorage } from "../../data/local/localStorage";
import { IconPoint } from "../../assets/IconPoint";
import BoxSticky from "../boxSticky/BoxSticky";
import SearchFor from "../searchFor/SearchFor";
import HomeContext from "../../context/home/HomeContext";
import Select from "../select/Select";
import './HomeOptions.css';
const initialOptions = [
    {id: 1, selected:true, value:"Alumnos"},
    {id: 2, selected:false, value:"Profesores"},
    {id: 3, selected:false, value:"Colaboradores"},
]
const HomeOptions = () => {
    const { formAddPerson, getSectionSelected } = useContext(HomeContext);
    const options = useRef(getOptionsLocalStorage()??initialOptions);
    const [ optionSelected, setOptionSelected ] = useState({value:options.current.find(option => option.selected).value});
    useEffect(() => {
        let updateOptionSelected = options.current.map(option => {
            if(option.value===optionSelected.value) return {...option, selected:true}
            else return {...option, selected: false}
        });
        saveOptionsLocalStorage(updateOptionSelected);
    },[optionSelected.value]);
    const handleOption = (state) => {
        getSectionSelected(state.value);
    }
    return (
        <BoxSticky>
            <div className="home-options">
                <div className="box-select">
                    <Select
                        state={optionSelected}
                        setState={setOptionSelected}
                        options={options.current}
                        action={handleOption}
                    />
                </div>
                <div className="total">
                    <IconPoint size={5} />
                    <p>{2003} de {30002}</p>
                </div>
                <button className="box-btn-add" type="button" onClick={() => formAddPerson(true)}>
                    <p>Agregar alumno</p>
                </button>
                <SearchFor />
            </div>
        </BoxSticky>
    );
}
export default HomeOptions;