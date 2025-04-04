import { useContext } from 'react';
import OptionLoadFile from "./components/optionLoadFile/OptionLoadFile";
import ilustrationOpStudend from '../../assets/ilustrationOpStudend.png';
import ilustrationOpTeacher from '../../assets/ilustrationOpTeacher.png';
import ilustrationOpCollaborators from '../../assets/ilustrationOpCollaborators.png';
import SectionOptionsContext from '../../context/sectionOptions/SectionOptionsContext';
import './optionsLoadFiles.css';
const OptionsLoadFiles = () => {
    const {options, setOptions} = useContext(SectionOptionsContext);
    return (
        <ul className="options-load-files">
            <OptionLoadFile
                type="Estudiante"
                ilustration={ilustrationOpStudend}
                id={options[0].id}
                active={options[0].active}
                options={options}
                setOptions={setOptions}
            />
            <OptionLoadFile
                type="Profesor"
                ilustration={ilustrationOpTeacher}
                id={options[1].id}
                active={options[1].active}
                options={options}
                setOptions={setOptions}
            />
            <OptionLoadFile
                type="Colaborador"
                ilustration={ilustrationOpCollaborators}
                id={options[2].id}
                active={options[2].active}
                options={options}
                setOptions={setOptions}
            />
        </ul>
    );
}
export default OptionsLoadFiles;