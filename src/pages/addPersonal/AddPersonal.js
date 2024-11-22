import { useContext } from 'react';
import ShowFileContent from '../../components/showFileContent/ShowFileContent'
import Section from "../../components/section/Section";
import TitleSection from "../../components/titleSection/TitleSection";
import SectionNote from "../../components/sectionNote/SectionNote";
import OptionsLoadFiles from "../../components/optionsLoadFiles/OptionsLoadFiles";
import UploadFile from "../../components/uploadFile/UploadFile";
import AddPersonalContext from '../../context/addPersonal/AddPersonalContext';
const AddPersonal = () => {
    const { fileContent } = useContext(AddPersonalContext);
    return (
        <Section>
            <TitleSection value="Agregar personal" />
            <SectionNote 
                value="Selecciona el tipo de personas que hay en el archivo de Excel que se va a cargar."
                maxWidth={500}
            />
            <OptionsLoadFiles />
            <UploadFile />
            {fileContent.length > 0 && <ShowFileContent />}
        </Section>
    );
}
export default AddPersonal;