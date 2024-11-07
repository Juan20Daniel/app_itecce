import { useContext, useState, useEffect } from 'react';
import BoxModalLeft from '../boxModalLeft/BoxModalLeft';
import Header from './components/header/Header';
import InputForm from './components/inputForm/InputForm';
import Select from '../select/Select';
import BtnAction from '../btnAction/BtnAction';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import axiosInstance from '../../data/remote/axios.instance';
import SectionContext from '../../context/Section/SectionContext';
import './formAddPersons.css';
const typeStudes = [
    {id: 1, selected:false, value:"BACHILLERATO GENERAL"},
    {id: 2, selected:false, value:"BACHILLERATO TÉCNICO EN SEGURIDAD PÚBLICA"},
    {id: 3, selected:false, value:"BACHILLERATO TÉCNICO EN COMERCIO EXTERIOR"},
    {id: 4, selected:false, value:"LICENCIATURA EN ADMINISTRACIÓN"},
    {id: 5, selected:false, value:"LICENCIATURA EN ADUANAS Y COMERCIO EXTERIOR"},
    {id: 6, selected:false, value:"LICENCIATURA EN DISEÑO GRÁFICO"},
    {id: 7, selected:false, value:"LICENCIATURA EN DERECHO"},
    {id: 8, selected:false, value:"LICENCIATURA EN NUTRICIÓN"},
    {id: 9, selected:false, value:"LICENCIATURA EN CONTABILIDAD"},
    {id: 10, selected:false, value:"LICENCIATURA EN CIENCIAS DE LA EDUCACIÓN"},
    {id: 11, selected:false, value:"LICENCIATURA EN LENGUA INGLESA"},
    {id: 12, selected:false, value:"MAESTRÍA EN GESTIÓN OPERACIÓN ADUANERA"},
    {id: 13, selected:false, value:"MAESTRÍA EN DERECHO FAMILIAR"},
    {id: 14, selected:false, value:"MAESTRÍA EN FISCAL"},
    {id: 15, selected:false, value:"MAESTRÍA EN INVESTIGACIÓN EDUCATIVA"},
    {id: 16, selected:false, value:"INGENIERIA MECANICA AUTOMOTRIZ"},
    {id: 17, selected:false, value:"EGRESADOS"}
]
const typeSections = {
    Alumnos:'STUDENT',
    Profesores:'TEACHER',
    Colaboradores:'COLABORATOR'
}
const FormaAddPerson = ({setFormAddPerson}) => {
    const [ name, setName ] = useState({value:'', camp:'name', error:false, exp:/^[A-Z ÁÉÍÓÚÑ]{5,20}$/});
    const [ firstname, setFirstname ] = useState({value:'', camp:'firstname', error:false, exp:/^[A-Z ÁÉÍÓÚÑ]{5,20}$/});
    const [ lastname, setLastname ] = useState({value:'', camp:'lastname', error:false, exp:/^[A-Z ÁÉÍÓÚÑ]{5,20}$/});
    const [ group, setGroup ] = useState({value:'', camp:'group', error:false, exp:/^[A-Z0-9 -/]{5,15}$/});
    const [ id, setId ] = useState({value:'', camp:'id', error:false, exp:/^[0-9]{7}$/});
    const [ area, setArea ] = useState({value:'', camp:'area', error:false, exp:/^[A-Z ÁÉÍÓÚ]{10,50}$/});
    const [ formValid, setFormValid ] = useState(false);
    const { sectionSelected } = useContext(SectionContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const clearInputs = () => {
        setName({...name, value:''});
        setFirstname({...firstname, value:''});
        setLastname({...lastname, value:''});
        setGroup({...group, value:''});
        setId({...id, value:''});
        setArea({...area, value:''});
    }
    const save = async () => {
        try {
            let person = {
                id:parseInt(id.value),
                name:name.value,
                firstname:firstname.value,
                lastname:lastname.value,
                area:area.value === '' ? false : area.value,
                group:group.value === '' ? false : group.value,
                typePerson:typeSections[sectionSelected]
            }
            if(!person.area) delete person.area;
            if(!person.group) delete person.group;
            const response = await axiosInstance.post(`/students/insert-person`, {person});
            openCentralAlert(
                'Guardado',
                response.message,
                'success'
            );
            clearInputs();
        } catch (err) {
            const {message, error} = err;
            openCentralAlert(
                'Error',
                error.code === 'ER_DUP_ENTRY' ? 'La mátricula ingresada, ya esta registrada, favor de colocar otra' : message, 
                'error'
            );
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setName(name => ({ ...name, error:!name.exp.test(name.value) }));
        setFirstname(firstname => ({ ...firstname, error:!firstname.exp.test(firstname.value) }));
        setLastname(lastname => ({ ...lastname, error:!lastname.exp.test(lastname.value) }));
        setGroup(group => ({ ...group, error:!group.exp.test(group.value) }));
        setId(id => ({ ...id, error:!id.exp.test(id.value) }));
        setArea(area => ({ ...area, error:!area.exp.test(area.value) }));
        if(!formValid) return;
        openCentralAlert(
            'Guardar',
            '¿Seguo que quieres guardar la informacíon?',
            'confirm',
            save
        );
    }
    useEffect(() => {
        if(!name.exp.test(name.value) ||
        !firstname.exp.test(firstname.value) ||
        !lastname.exp.test(lastname.value) ||
        !id.exp.test(id.value)) return setFormValid(false);
        if(sectionSelected !== 'Alumnos') return setFormValid(true);
        if(!group.exp.test(group.value) && !area.exp.test(area.value)) return setFormValid(false);
        setFormValid(true);
    },[name, firstname, lastname, group, id, area, sectionSelected]);
    return (
        <BoxModalLeft>
            <div className='form-add-person'>
                <form className='form-scroll' onSubmit={handleSubmit}>
                    <Header setFormAddPerson={setFormAddPerson} />
                    <div className='box-form'>
                        <div className='box-input-name'>
                            <InputForm
                                type='text'
                                state={name}
                                setState={setName}
                                placeholder='Nombre'
                                messageError='El nombre no es válido'
                            />
                        </div>
                        <InputForm
                            type='text'
                            state={firstname}
                            setState={setFirstname}
                            placeholder='Apellido paterno'
                            messageError='El apellido no es válido'
                        />
                        <InputForm
                            type='text'
                            state={lastname}
                            setState={setLastname}
                            placeholder='Apellido materno'
                            messageError='El apellido no es válido'
                        />
                        {sectionSelected === 'Alumnos' &&
                            <>
                                <div className='box-select'>
                                    <Select
                                        state={area}
                                        setState={setArea}
                                        options={typeStudes}
                                        label='Selecciona una carrera'
                                    />
                                    {area.error && 
                                        <div className='box-error-message'>
                                            <p>Selecciona una carrera</p>
                                        </div>
                                    }
                                </div>
                                <InputForm
                                    type='text'
                                    state={group}
                                    setState={setGroup}
                                    placeholder='Grupo'
                                    messageError='El grupo no es válido'
                                />
                            </>
                        }
                        <InputForm
                            type='text'
                            state={id}
                            setState={setId}
                            placeholder='Mátricula'
                            messageError='La matrícula no es válida'
                        />
                    </div>
                    <div className='form-btns'>
                        <BtnAction
                            value='Guardar'
                            color='blue'
                            type='submit'
                        />
                        <BtnAction
                            value='Cancelar'
                            color='gray'
                            action={() => setFormAddPerson(false)}
                        />
                    </div>
                </form>
            </div>
        </BoxModalLeft>
    );
}

export default FormaAddPerson;