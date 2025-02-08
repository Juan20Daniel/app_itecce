
import { Outlet } from "react-router-dom";
import GenerateIdsProvider from '../../context/generateIds/GenerateIdsProvider';
import AddPersonalProvider from '../../context/addPersonal/AddPersonalProvider';
import ValidityPeriodsProvider from "../../context/validityPeriods/ValidityPeriodsProvider";
import Header from "../../components/header/Header";
import IdTemplatesProvider from "../../context/idTemplates/IdTemplatesProvider";
import SectionOptionsProvider from "../../context/sectionOptions/SectionOptionsProvider";
import CareersProvider from "../../context/careers/CareersProvider";
import './appLayout.css';

const AppLayout = () => {
    return (
        <GenerateIdsProvider>
            <SectionOptionsProvider>
                <AddPersonalProvider>
                    <ValidityPeriodsProvider>
                        <CareersProvider>
                            <IdTemplatesProvider>
                                <div className="home">
                                    <Header /> 
                                    <div className="content">
                                        <Outlet />
                                    </div>
                                </div>
                            </IdTemplatesProvider>
                        </CareersProvider>
                    </ValidityPeriodsProvider>
                </AddPersonalProvider>
            </SectionOptionsProvider>
        </GenerateIdsProvider>
    );
}
export default AppLayout;