import './notData.css';
import { IconAvatars } from '../../assets/IconAvatars';
const NotData = ({ children }) => {
    return (
        <div className="not-data">
            <IconAvatars />
            {children}
        </div>
    )
}
export default NotData;