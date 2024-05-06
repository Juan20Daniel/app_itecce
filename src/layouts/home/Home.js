import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/header/Header";
import './home.css';
import HomeViewModel from "./HomeViewModel";

const Home = () => {
    const { verifyUser } = HomeViewModel();
    useEffect(() => {
        verifyUser();
    },[verifyUser]);
    return (
        <div className="home">
            <Header /> 
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
export default Home;