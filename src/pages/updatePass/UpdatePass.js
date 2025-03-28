import { useContext, useState, useLayoutEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconPassword } from '../../assets/IconPassword';
import { expretions } from '../../helpers/expretions';
import axiosInstance from '../../data/remote/axios.instance';
import Spin from '../../components/spin/Spin';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import InputGroup from '../../components/inputGroup/InputGroup';
import TitleAuth from '../../components/titleAuth/TitleAuth';
import BtnRedirect from '../../components/btnRedirect/BtnRedirect';
import BtnAuth from '../../components/btnAuth/BtnAuth';
import './updatePass.css';

const UpdatePass = () => {
    const [ newPassword, setNewPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ confirmPassword, setConfirmPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isVerifingToken, setIsVerifiToken ] = useState(true);
    const [ searchParams ] = useSearchParams();
    const { openCentralAlert } = useContext(CentralAlertContext);
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const verifyToken = useCallback(async (token) => {
        try {
            await axiosInstance.get(`/users/${token}`);
        } catch (error) {
            openCentralAlert('Cambio de contraseña', error.message, 'error');
            navigate('/auth');
        } finally {
            setIsVerifiToken(false);
        }
    },[openCentralAlert, navigate]);

    useLayoutEffect(() => {
        if(!token) return navigate('/auth');
        verifyToken(token);
    },[token, navigate, verifyToken ]);

    const validatePasswords = () => {
        if(!expretions.password.test(newPassword.value)) {
            setNewPassword(preState => ({...preState, state:'error'}));
            throw new Error('La contraseña no es válida, verifica que contenga de 8 a 20 caracteres entre números, letras y caracteres especiales.');
        }
        if(newPassword.value !== confirmPassword.value) {
            setConfirmPassword(preState => ({...preState, state:'error'}));
            throw new Error('Las contraseña no coinciden.');
        }
        setNewPassword(preState => ({...preState, state:'normal'}));
        setConfirmPassword(preState => ({...preState, state:'normal'}));
    } 
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            validatePasswords();
            await axiosInstance.patch(`/users/update-pass/${token}`, {password:newPassword.value});
            openCentralAlert('Actualización de contraseña', 'La contraseña se actualizó de manera correcta.', 'success');
            navigate('/auth');
        } catch (error) {
            console.log(error);
            openCentralAlert('Actualización de contraseña', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            {isVerifingToken 
                ?   <div className='box-verifing-token'>
                        <Spin size={35} color='black' />
                        <p>Cargando...</p>
                    </div>
                :   <form onSubmit={handleSubmit}>
                        <TitleAuth value='ACTUALIZAR CONTRASEÑA' />
                        <InputGroup
                            id='new-password'
                            inputStyle='input-group-auth'
                            placeholder='NUEVA CONTRASEÑA'
                            camp={newPassword}
                            type='password'
                            setValue={setNewPassword}
                        >
                            <IconPassword
                                size={20}
                                color={newPassword.state === 'normal' 
                                    ? '#979797' 
                                    : '#AC3636'
                                }
                            />
                        </InputGroup>
                        <InputGroup
                            id='confirm-password'
                            inputStyle='input-group-auth'
                            placeholder='CONFIRMAR CONTRASEÑA'
                            camp={confirmPassword}
                            type='password'
                            setValue={setConfirmPassword}
                        >
                            <IconPassword
                                size={20}
                                color={confirmPassword.state === 'normal' 
                                    ? '#979797' 
                                    : '#AC3636'
                                }
                            />
                        </InputGroup>
                        <BtnAuth 
                            value='Guardar'
                            isLoading={isLoading}
                        />
                        <BtnRedirect 
                            value='Iniciar sesión'
                            action={() => navigate('/auth')}
                        />
                    </form>
            }
        </>
    );
}

export default UpdatePass;