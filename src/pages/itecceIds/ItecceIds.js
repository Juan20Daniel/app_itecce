import { useEffect } from "react";
import { statePage } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
const ItecceIds = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(statePage({ id:2, active:true }));
    },[dispatch]);
    return (
        <Outlet />
    );
}

export default ItecceIds;