import React from 'react';
import Section from "../../components/section/Section";
import TitleSection from "../../components/titleSection/TitleSection";
import SectionNote from "../../components/sectionNote/SectionNote";
import CountSettings from '../../components/countSettings/CountSettings';
import IdSettings from '../../components/idSettings/IdSettings';
const Config = () => {
    return (
        <Section>
            <TitleSection value='Configuración' />
            <SectionNote 
                value='Area de configuración general donde puedes cambiar los datos de la cuenta o la configuración de las credenciales.'
                maxWidth={600}    
            />
            <CountSettings />
            <IdSettings />
        </Section>
    );
}

export default Config;