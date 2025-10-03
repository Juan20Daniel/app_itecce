import { useContext } from "react";
import Section from "../../components/section/Section";
import TitleSection from "../../components/titleSection/TitleSection";
import SectionNote from "../../components/sectionNote/SectionNote";
import BoxLoadImages from "../../components/boxLoadImages/BoxLoadImages";
import LoadImageActions from "../../components/loadImagesActions/LoadImageActions";
import ShowImages from "../../components/showImages/ShowImages";
import PrintIds from "../../components/printIds/PrintIds";
import GenerateIdsContext from "../../context/generateIds/GenerateIdsContext";
import CredentialsProvider from "../../context/credentialsSheet/CredentialsSheetProvider";

const GenerateIds = () => {
    const { images, printIds } = useContext(GenerateIdsContext);
    return (
        <Section>
            <TitleSection value='Generar credenciales' />
            <SectionNote
                value={!printIds
                    ? 'Arrastra y suelta todas las imágenes en el rectángulo o haz clic sobre él para cargar las imágenes'
                    : 'Genera las credenciales de cada página con el botón de imprimir y marca la hoja como impresa'
                }
                maxWidth={600}
            />
            {(!images && !printIds) && <BoxLoadImages />}
            {(images && !printIds) && 
                <>
                    <ShowImages />
                    <LoadImageActions />
                </>
            }
            {printIds &&
                <CredentialsProvider>
                    <PrintIds />
                </CredentialsProvider>
            }
        </Section>
    );
}

export default GenerateIds;