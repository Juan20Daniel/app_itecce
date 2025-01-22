
import { Outlet } from "react-router-dom";
import GenerateIdsProvider from '../../context/generateIds/GenerateIdsProvider';
import AddPersonalProvider from '../../context/addPersonal/AddPersonalProvider';
import ValidityPeriodsProvider from "../../context/validityPeriods/ValidityPeriodsProvider";
import Header from "../../components/header/Header";
import IdTamplatesProvider from "../../context/idTamplates/IdTamplatesProvider";
import SectionOptionsProvider from "../../context/sectionOptions/SectionOptionsProvider";
import './appLayout.css';

const AppLayout = () => {
    return (
        <GenerateIdsProvider>
            <SectionOptionsProvider>
                <AddPersonalProvider>
                    <ValidityPeriodsProvider>
                        <IdTamplatesProvider>
                            <div className="home">
                                <Header /> 
                                <div className="content">
                                    <Outlet />
                                </div>
                            </div>
                        </IdTamplatesProvider>
                    </ValidityPeriodsProvider>
                </AddPersonalProvider>
            </SectionOptionsProvider>
        </GenerateIdsProvider>
    );
}
export default AppLayout;