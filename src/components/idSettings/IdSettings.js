import SettingBox from "../settingBox/SettingBox";
import ValidityPeriods from "./components/validityPeriods/ValidityPeriods";
import IdTemplates from "./components/idTemplates/IdTemplates";
import Careers from "./components/careers/Careers";

const IdSettings = () => {
    return (
        <SettingBox title='Credenciales'>
            <ValidityPeriods />
            <Careers />
            <IdTemplates />
        </SettingBox>
    );
}

export default IdSettings;