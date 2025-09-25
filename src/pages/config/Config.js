import React from 'react';
import Section from "../../components/section/Section";
import TitleSection from "../../components/titleSection/TitleSection";
import SectionNote from "../../components/sectionNote/SectionNote";
import IdSettings from '../../components/idSettings/IdSettings';
import DbActions from '../../components/dbActions/DbActions';
const Config = () => (
    <Section>
        <TitleSection value='Configuración' />
        <SectionNote 
            value='Area de configuración general donde puedes cambiar la configuración de las credenciales.'
            maxWidth={600}    
        />
        <IdSettings />
        <DbActions />
    </Section>
);

export default Config;