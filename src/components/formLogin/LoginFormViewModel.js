import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { check } from '../../helpers/helpers';
import axiosInstance from '../../data/remote/axios.instance';
import { useDispatch } from 'react-redux';
import { setCentralAlert } from '../../redux/dataSlice';
import { saveTokenLocalStorage } from '../../data/local/localStorage';
const errorMesages = {
    user:'El usuario no es válido, favor de verificar que solo contenga entre 6 y 20 números o letras solamente.',
    password:'La contraseña no es válida, favor de verificar que solo contenga entre 8 y 20 caracteres.',
    userAndPass:`El usuario y la contraseña no son válidos, favor de verificar que el usuario solo contenga entre 6 y 20 números o letras solamente y 
    la contraseña entre 8 y 20 caracteres.`
}
export const LoginFormViewModel = () => {
    const [ userCamp, setUserCamp ] = useState({ value:'', name:'user', state:'normal'});
    const [ password, setPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = async e => {
        e.preventDefault();
        if(!verifyInfo()) return;
        try {
            setIsLoading(true);
            const result = await axiosInstance.get(`/auth/${userCamp.value}/${password.value}`);
            saveTokenLocalStorage(result.token);
            setIsLoading(false);
            navigate('/', {replace:true});

        } catch (error) {
            setIsLoading(false);
            dispatch(setCentralAlert({
                visible:true, 
                title:'Error de acceso', 
                message:error.message,
                type:'error'
            }));
        }
    }
    const verifyInfo = () => {
        let resultUser = check(userCamp.name, userCamp.value); 
        let resultPass = check(password.name, password.value);
        setUserCamp({...userCamp, state:resultUser ? 'normal' : 'error'});
        setPassword({...password, state:resultPass ? 'normal' : 'error'});
        if(!resultUser || !resultPass) {
            dispatch(setCentralAlert({
                visible:true, 
                title:'Error en uno de los campos', 
                message:!resultUser && !resultPass ? errorMesages.userAndPass : !resultUser ? errorMesages.user : errorMesages.password,
                type:'error'
            }));
            return false;
        }
        return true;
    }
    return { userCamp, password, isLoading, setPassword, setUserCamp, login }
}