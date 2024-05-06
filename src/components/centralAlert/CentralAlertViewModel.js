
import { useSelector, useDispatch } from "react-redux";
import { setCentralAlert } from "../../redux/dataSlice";
export const CentralAlertViewModel = () => {
    const {centralAlert} = useSelector(state => state.credenciales);
    const dispatch = useDispatch();

    const stopClic = e => {
        e.stopPropagation();
    }
    const closeAlert = () => dispatch(setCentralAlert({visible:false, title:'', message:'', type:''}));
    return {centralAlert, stopClic, closeAlert}
}