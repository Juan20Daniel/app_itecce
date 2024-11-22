import SettingBox from "../settingBox/SettingBox";
import ValidityPeriods from "../validityPeriods/ValidityPeriods";
import './idSettings.css';
const IdSettings = () => {
    return (
        <SettingBox title="Credenciales">
            <ValidityPeriods />
        </SettingBox>
    );
}
export default IdSettings;