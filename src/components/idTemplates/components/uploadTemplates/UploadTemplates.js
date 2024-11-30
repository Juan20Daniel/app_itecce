import './uploadTemplates.css'
import BoxUploadTemplate from '../boxUploadTemplate/BoxUploadTemplate';
const UploadTemplates = ({title}) => {
    return (
        <div className='upload-templates'>
            <p className='title'>{title}</p>
            <div className='box-loaders'>
                <BoxUploadTemplate name='Frontal' id="front-id"/>
                <BoxUploadTemplate name='Reverso' id="reverse-id"/>
            </div>
        </div>
    );
}

export default UploadTemplates;