import './uploadTemplates.css'

const UploadTemplates = ({title, children}) => {
    return (
        <div className='upload-templates'>
            <p className='title'>{title}</p>
            <div className='box-loaders'>
                {children}                
            </div>
        </div>
    );
}

export default UploadTemplates;