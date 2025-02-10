import SettingBox from "../settingBox/SettingBox";
import ValidityPeriods from "./components/validityPeriods/ValidityPeriods";
import IdTemplates from "./components/idTemplates/IdTemplates";
import Careers from "./components/careers/Careers";
import CareerSelectedProvider from "../../context/careerSelected/CareerSelectedProvider";
const IdSettings = () => {
    return (
        <SettingBox title='Credenciales'>
            <ValidityPeriods />
            <CareerSelectedProvider>
                <Careers />
            </CareerSelectedProvider>
            <IdTemplates />
        </SettingBox>
    );
}

export default IdSettings;