import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import CentralAlert from '../../components/centralAlert/CentralAlert';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import './mainLayout.css';

const MainLayout = () => {
    const { centralAlert } = useContext(CentralAlertContext);
    return (
        <main>
            <Outlet />
            {centralAlert.visible && <CentralAlert />}
        </main>
    )
}
export default MainLayout;