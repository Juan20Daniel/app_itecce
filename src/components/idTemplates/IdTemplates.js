import './idTemplates.css';
import UploadTemplates from './components/uploadTemplates/UploadTemplates';
const IdTemplates = () => {
    console.log('exce')
    return (
        <div className='id-tamplates'>
            <UploadTemplates title='Plantilla de credencial de alumno'/>
            <UploadTemplates title='Plantilla de credencial de profesor'/>
            <UploadTemplates title='Plantilla de credencial de colaborador'/>
        </div>
    );
}

export default IdTemplates;