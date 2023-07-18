import './btnActionStyles.css';
const BtnAction = ({ value, color, action }) => {
    return (
        <button className={`btn-action ${color}`} onClick={() => action()}>
            { value }
        </button>
    );
}

export default BtnAction;