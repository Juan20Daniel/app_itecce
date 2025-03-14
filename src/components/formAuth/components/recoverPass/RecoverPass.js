import { useContext, useState } from 'react';
import { IconEmail } from '../../../../assets/IconEmail';
import { expretions } from '../../../../helpers/expretions';
import ChangeFormAuthContext from '../../../../context/changeFormAuth/ChangeFormAuthContext';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import InputGroup from '../../../inputGroup/InputGroup';
import TitleAuth from '../titleAuth/TitleAuth';
import BtnRedirect from '../btnRedirect/BtnRedirect';
import BtnAuth from '../btnAuth/BtnAuth';

const RecoverPass = () => {
    const [ email, setEmail ] = useState({ value:'', name:'email', state:'normal'});
    const [ isLoading, setIsLoading ] = useState(false);
    const { setShowLogin } = useContext(ChangeFormAuthContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
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
            console.log('recuperar contraseña');
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
                action={() => setShowLogin(true)}
            />
        </form>
    );
}

export default RecoverPass;