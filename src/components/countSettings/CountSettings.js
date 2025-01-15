import { useNavigate } from "react-router-dom";
import { removeTokenLocalStorage } from "../../data/local/localStorage";
import { useState } from "react";
import { IconUser } from "../../assets/IconUser";
import { IconEmail } from "../../assets/IconEmail";
import { IconPassword } from "../../assets/IconPassword";
import { IconSave } from "../../assets/IconSave";
import SettingBox from "../settingBox/SettingBox";
import InputGroup from "../inputGroup/InputGroup";
import Button from '../button/Button';
import './countSettings.css';
const CountSettings = () => {
    const [ email, setEmail ] = useState({ value:'asistentesistemas@itecce.edu.mx', name:'email', state:'normal'});
    const [ user, setUser ] = useState({ value:'Sistemas', name:'user', state:'normal'});
    const [ password, setPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ confirmPass, setConfirmPass ] = useState({ value:'', name:'password', state:'normal'});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('guardando...')
    }
    const closeSession = () => {
        removeTokenLocalStorage();
        navigate('/login', {replace:true});
    }
    return (
        <SettingBox title='Cuenta'>
            <form onSubmit={handleSubmit}>
                <InputGroup
                    id='email'
                    inputStyle='input-group-setting'
                    placeholder='Correo'
                    camp={email}
                    type='email'
                    setValue={setEmail}
                >
                    <IconEmail size={20} color={email.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                    <label htmlFor='email'>Correo:</label>
                </InputGroup>
                <InputGroup
                    id='new-user'
                    inputStyle='input-group-setting'
                    placeholder='Usuario'
                    camp={user}
                    type='text'
                    setValue={setUser}
                >
                    <IconUser width={16} height={17} color={user.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                    <label htmlFor='new-user'>Usuario:</label>
                </InputGroup>
                <InputGroup
                    id='new-pass'
                    inputStyle='input-group-setting-pass'
                    placeholder='Cambiar contraseña'
                    camp={password}
                    type='password'
                    setValue={setPassword}
                >   
                    <IconPassword size={22} color={password.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                </InputGroup>
                <InputGroup
                    id='confirm-new-pass'
                    inputStyle='input-group-setting-pass'
                    placeholder='Confirmar contraseña'
                    camp={confirmPass}
                    type='password'
                    setValue={setConfirmPass}
                >   
                    <IconPassword size={22} color={confirmPass.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                </InputGroup>
                <div className="btns-settings">
                    <div className="box-btn-settings">
                        <Button 
                            value='Guardar'
                            type="submit"
                            btnStyle='btn-with-icon'
                        >
                            <IconSave size={20} color="#000000" />
                        </Button>
                    </div>
                    <div className="box-btn-settings">
                        <Button 
                            value='Cerrar sesión'
                            type="button"
                            btnStyle='btn-with-icon'
                            action={closeSession}
                        >
                            <IconSave size={20} color="#000000" />
                        </Button>
                    </div>
                </div>
            </form>
        </SettingBox>
    )
}

export default CountSettings;