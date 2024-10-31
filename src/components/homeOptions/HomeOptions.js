import { useContext, useState } from "react";
import BoxSticky from "../boxSticky/BoxSticky";
import SearchFor from "../searchFor/SearchFor";
import HomeContext from "../../context/home/HomeContext";
import Select from "../select/Select";
import './HomeOptions.css';
import { IconPoint } from "../../assets/IconPoint";
const options = [
    {id: 1, selected:true, name:"Alumnos"},
    {id: 2, selected:false, name:"Profesores"},
    {id: 3, selected:false, name:"Colaboradores"},
]
const HomeOptions = () => {
    const [ section, setSection ] = useState({value:'Alumnos'});
    const { formAddPerson } = useContext(HomeContext);
    return (
        <BoxSticky>
            <div className="home-options">
                <div className="box-select">
                    <Select
                        state={section}
                        setState={setSection}
                        options={options}
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