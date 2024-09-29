import Section from "../../components/section/Section";
import TitleSection from "../../components/titleSection/TitleSection";
import SectionNote from "../../components/sectionNote/SectionNote";
import DownloadReport from "../../components/downloadReport/DownloadReport";
const GenerateReport = () => {
    return (
        <Section>
            <TitleSection value='Generar reporte' />
            <SectionNote  value='Arrastra y suelta todas las imagenes en el rectangulo o has clic sobre el para cargar las imagenes'/>
            <DownloadReport />
        </Section>
    );
}

export default GenerateReport;

