import SettingBox from '../settingBox/SettingBox';
import SubTitleSetting from "../subTitleSetting/SubTitleSetting";
import Note from './components/note/Note';
import Actions from './components/actions/Actions';
import './dbActions.css';

const DbActions = () => {
    return (
        <SettingBox title='Base de datos'>
            <SubTitleSetting value='Opciones de limpieza' />
            <Note />
            <Actions />
        </SettingBox>
    )
}

export default DbActions;