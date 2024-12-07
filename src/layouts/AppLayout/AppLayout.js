import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/dataSlice";
import GenerateIdsProvider from '../../context/generateIds/GenerateIdsProvider';
import AddPersonalProvider from '../../context/addPersonal/AddPersonalProvider';
import ValidityPeriodsProvider from "../../context/validityPeriods/ValidityPeriodsProvider";
import Header from "../../components/header/Header";
import IdTamplatesProvider from "../../context/idTamplates/IdTamplatesProvider";
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
                <ValidityPeriodsProvider>
                    <IdTamplatesProvider>
                        <div className="home">
                            <Header /> 
                            <div className="content">
                                <Outlet />
                            </div>
                        </div>
                    </IdTamplatesProvider>
                </ValidityPeriodsProvider>
            </AddPersonalProvider>
        </GenerateIdsProvider>
    );
}
export default AppLayout;