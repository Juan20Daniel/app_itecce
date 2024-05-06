import './addPersonal.css';
import ShowFileContent from '../../components/showFileContent/ShowFileContent'
import Section from "../../components/section/Section";
import TitleSection from "../../components/titleSection/TitleSection";
import SectionNote from "../../components/sectionNote/SectionNote";
import OptionsLoadFiles from "../../components/optionsLoadFiles/OptionsLoadFiles";
import UploadFile from "../../components/uploadFile/UploadFile";
import AddPersonalProvider from "../../context/addPersonal/AddPersonalProvider";
import { useSelector } from 'react-redux';
const AddPersonal = () => {
    const { modalShowFile } = useSelector(state => state.credenciales);
    return (
        <AddPersonalProvider>
            <Section>
                <TitleSection value="Agregar personal" />
                <SectionNote value="Selecciona el tipo de personas que hay en el archivo de excel que se va a cargar." />
                <OptionsLoadFiles />
                <UploadFile />
                {modalShowFile && <ShowFileContent />}
            </Section>
        </AddPersonalProvider>
    )
}
export default AddPersonal;