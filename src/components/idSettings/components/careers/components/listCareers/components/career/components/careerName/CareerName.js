import './careerName.css';
const CareerName = ({id, fullname}) => (
    <label htmlFor={id} title={fullname}>
        {fullname}:
    </label>
);

export default CareerName;