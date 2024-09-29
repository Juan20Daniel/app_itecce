import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/dataSlice";
import ModalShowPersonProvider from "../../context/modalShowPerson/ModalShowPersonProvider";
import Header from "../../components/header/Header";
import './home.css';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const verifyUser = () => {
            const user = getUser();
            if(!user) return navigate('/login',{replace:true});
            dispatch(saveUser(user));
        }   
        verifyUser();
    },[navigate, dispatch]);
    return (
        <ModalShowPersonProvider>
            <div className="home">
                <Header /> 
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </ModalShowPersonProvider>
    );
}
export default Home;