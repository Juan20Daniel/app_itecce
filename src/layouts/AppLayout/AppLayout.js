import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/dataSlice";
import GenerateIdsProvider from '../../context/generateIds/GenerateIdsProvider';
import AddPersonalProvider from '../../context/addPersonal/AddPersonalProvider';
import Header from "../../components/header/Header";
import './appLayout.css';

const AppLayout = () => {
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
        <GenerateIdsProvider>
            <AddPersonalProvider>
                <div className="home">
                    <Header /> 
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            </AddPersonalProvider>
        </GenerateIdsProvider>
    );
}
export default AppLayout;