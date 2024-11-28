import SettingBox from "../settingBox/SettingBox";
import ValidityPeriods from "../validityPeriods/ValidityPeriods";
import IdTemplates from "../idTemplates/IdTemplates";
import './idSettings.css';
const IdSettings = () => {
    return (
        <SettingBox title="Credenciales">
            <ValidityPeriods />
            <IdTemplates />
        </SettingBox>
    );
}
export default IdSettings;