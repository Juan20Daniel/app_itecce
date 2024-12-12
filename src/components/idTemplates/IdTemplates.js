import { useContext } from 'react';
import UploadTemplates from './components/uploadTemplates/UploadTemplates';
import BoxUploadTemplate from './components/boxUploadTemplate/BoxUploadTemplate';
import IdTamplatesContext from '../../context/idTamplates/IdTamplatesContext';
import BtnTryAgain from '../btnTryAgain/BtnTryAgain';
import './idTemplates.css';
const IdTemplates = () => {
    const {
        loadingTemplates,
        errorLoadingTamplates,
        studentTemplates,
        teacherTemplates,
        collaboratorTemplates,
        setStudentTemplates,
        setTeacherTemplates,
        setCollaboratorTemplates,
        getTemplates
    } = useContext(IdTamplatesContext);
    return (
        <div className='id-tamplates'>
            {loadingTemplates && <p>Cargando plantillas...</p>}
            {(!loadingTemplates && errorLoadingTamplates) && 
                <>
                    <p className='message-error'>Error al cargar las plantillas.</p>
                    <BtnTryAgain action={getTemplates}/>
                </>
            }
            {(!loadingTemplates && !errorLoadingTamplates) &&
                <>
                    <UploadTemplates title='Plantilla de credencial de alumno'>
                        <BoxUploadTemplate 
                            name='Frontal'
                            type="imgFront"
                            id='tamplate-front-student'
                            imageTamplate={studentTemplates.imgFront}
                            idSectionIdTemp={studentTemplates.idSectionIdTemp}
                            tamplateState={studentTemplates}
                            setState={setStudentTemplates}
                        />
                        <BoxUploadTemplate 
                            name='Reverso' 
                            type="imgReverse"
                            id='tamplate-back-student'
                            imageTamplate={studentTemplates.imgReverse}
                            idSectionIdTemp={studentTemplates.idSectionIdTemp}
                            tamplateState={studentTemplates}
                            setState={setStudentTemplates}
                        />
                    </UploadTemplates>
                    <UploadTemplates title='Plantilla de credencial de profesor'>
                        <BoxUploadTemplate 
                            name='Frontal' 
                            type="imgFront"
                            id='tamplate-front-teacher'
                            imageTamplate={teacherTemplates.imgFront}
                            idSectionIdTemp={teacherTemplates.idSectionIdTemp}
                            tamplateState={teacherTemplates}
                            setState={setTeacherTemplates}
                        />
                        <BoxUploadTemplate 
                            name='Reverso' 
                            type="imgReverse"
                            id='tamplate-back-teacher'
                            imageTamplate={teacherTemplates.imgReverse}
                            idSectionIdTemp={teacherTemplates.idSectionIdTemp}
                            tamplateState={teacherTemplates}
                            setState={setTeacherTemplates}
                        />
                    </UploadTemplates>
                    <UploadTemplates title='Plantilla de credencial de colaborador'>
                        <BoxUploadTemplate 
                            name='Frontal' 
                            type="imgFront"
                            id='tamplate-front-collaborator'
                            imageTamplate={collaboratorTemplates.imgFront}
                            idSectionIdTemp={collaboratorTemplates.idSectionIdTemp}
                            tamplateState={collaboratorTemplates}
                            setState={setCollaboratorTemplates}
                        />
                        <BoxUploadTemplate 
                            name='Reverso' 
                            type="imgReverse"
                            id='tamplate-back-collaborator'
                            imageTamplate={collaboratorTemplates.imgReverse}
                            idSectionIdTemp={collaboratorTemplates.idSectionIdTemp}
                            tamplateState={collaboratorTemplates}
                            setState={setCollaboratorTemplates}
                        />
                    </UploadTemplates>
                </> 
            }
        </div>
    );
}

export default IdTemplates;