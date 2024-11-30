import { IconAdd } from '../../../../assets/IconAdd';
import './inputUploadTamplate.css';
const InputUploadTamplate = ({id, valueInput, handleTaamplate}) => {
    return (
        <>
            <label htmlFor={id}>
                <IconAdd size={100} color='#505050'/>
            </label>
            <input 
                id={id}
                type='file'
                accept='.jpg,.JPG,.png,.PNG'
                onChange={handleTaamplate}
                value={valueInput}
            />
        </>
    );
}
export default InputUploadTamplate;