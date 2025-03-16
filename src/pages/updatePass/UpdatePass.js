import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconPassword } from '../../assets/IconPassword';
// import { expretions } from '../../helpers/expretions';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import InputGroup from '../../components/inputGroup/InputGroup';
import TitleAuth from '../../components/titleAuth/TitleAuth';
import BtnRedirect from '../../components/btnRedirect/BtnRedirect';
import BtnAuth from '../../components/btnAuth/BtnAuth';

const UpdatePass = () => {
    const [ newPassword, setNewPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ confirmPassword, setConfirmPassword ] = useState({ value:'', name:'confirmPassword', state:'normal'});
    const [ isLoading, setIsLoading ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const navigate = useNavigate();
    // const validateEmail = () => {
    //     if(!expretions.email.test(email.value)) {
    //         setEmail(preState => ({...preState, state:'error'}));
    //         throw new Error('El correo electrónico, no es válido.');
    //     }
    //     setEmail(preState => ({...preState, state:'normal'}));
    // } 
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            // validateEmail();
            console.log('Actualizando contraseña');
        } catch (error) {
            console.log(error);
            openCentralAlert('Actualizar contraseña', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
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
    );
}

export default UpdatePass;