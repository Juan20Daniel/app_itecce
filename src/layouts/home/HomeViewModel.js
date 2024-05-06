import { getUser } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/dataSlice";
const LayoutViewModel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const verifyUser = () => {
        const user = getUser();
        if(!user) return navigate('/login',{replace:true});
        dispatch(saveUser(user));
    }   
    return {verifyUser}
}

export default LayoutViewModel;