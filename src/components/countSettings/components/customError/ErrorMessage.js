import './errorMessage.css';
const ErrorMessage = ({message}) => {
    return (
        <div className='box-message-error'>
            <p>{message}</p>
        </div>
    );
}

export default ErrorMessage;