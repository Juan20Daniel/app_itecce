import { Outlet } from 'react-router-dom';
import './main.css';
import CentralAlert from '../../components/centralAlert/CentralAlert';
const Main = () => (
    <main>
        <Outlet />
        <CentralAlert />
    </main>
);
export default Main;