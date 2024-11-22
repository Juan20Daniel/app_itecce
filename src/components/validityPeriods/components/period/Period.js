import { IconPoint } from "../../../../assets/IconPoint";
import './period.css';
const Period = ({label, value, onChange}) => {
    return (
        <div className="period">
            <IconPoint size={5} />
            <label>{label}:</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default Period;