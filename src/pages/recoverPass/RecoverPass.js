import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconEmail } from '../../assets/IconEmail';
import { expretions } from '../../helpers/expretions';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import InputGroup from '../../components/inputGroup/InputGroup';
import TitleAuth from '../../components/titleAuth/TitleAuth';
import BtnRedirect from '../../components/btnRedirect/BtnRedirect';
import BtnAuth from '../../components/btnAuth/BtnAuth';
import axiosInstance from '../../data/remote/axios.instance';
const RecoverPass = () => {
    const [ email, setEmail ] = useState({ value:'', name:'email', state:'normal'});
    const [ isLoading, setIsLoading ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const navigate = useNavigate();
    const validateEmail = () => {
        if(!expretions.email.test(email.value)) {
            setEmail(preState => ({...preState, state:'error'}));
            throw new Error('El correo electrónico, no es válido.');
        }
        setEmail(preState => ({...preState, state:'normal'}));
    } 
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            validateEmail();
            await axiosInstance.get(`/auth/recover-pass?email=${email.value}`);
            openCentralAlert('Recuperar contraseña', `Se envió un correo de recuperación a ${email.value}`, 'success');
            setEmail({ value:'', name:'email', state:'normal'});
        } catch (error) {
            console.log(error);
            openCentralAlert('Recuperar contraseña', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <TitleAuth value='RECUPERAR CONTRASEÑA' />
            <InputGroup
                id='email'
                inputStyle='input-group-auth'
                placeholder='CORREO ELECTRÓNICO'
                camp={email}
                type='email'
                setValue={setEmail}
            >
                <IconEmail
                    size={16}
                    color={email.state === 'normal' 
                        ? '#979797' 
                        : '#AC3636'
                    }
                />
            </InputGroup>
            <BtnAuth 
                value='Recuperar'
                isLoading={isLoading}
            />
            <BtnRedirect 
                value='Iniciar sesión'
                action={() => navigate('/auth')}
            />
        </form>
    );
}

export default RecoverPass;