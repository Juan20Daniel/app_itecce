import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BreadCrumbs from "../components/breadCrumbs/BreadCrumbs";
import { useSelector } from "react-redux";
import './layoutStyles.css';
// import Alert from "../components/alert/Alert";
// import Loading from "../components/loading/Loading";
const Layout = () => {
    const { breadCrumbs, alert, loading } = useSelector((state) => state.credenciales);
    return (        
        <div className="layout">
            <Navbar />
            <main className="content">
                <BreadCrumbs namePage={breadCrumbs} />
                <Outlet />
            </main>
            {/* <Alert alert={alert}/>
            <Loading loading={loading} /> */}
        </div>
    );
}
export default Layout;