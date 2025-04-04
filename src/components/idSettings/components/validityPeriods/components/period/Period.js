import { IconPoint } from "../../../../../../assets/IconPoint";
import LoaderMessage from "../../../loaderMessage/LoaderMessage";
import './period.css';
const Period = ({label, value, onChange, isLoading, validPeriods}) => {
    return (
        <div className={`period ${!validPeriods[label] && 'invalid'}`}>
            <IconPoint size={5} />
            <label>{label}:</label>
            {isLoading 
                ? <LoaderMessage value='Cargando...' />
                :   <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        maxLength={6}
                    />
            }
        </div>
    )
}

export default Period;