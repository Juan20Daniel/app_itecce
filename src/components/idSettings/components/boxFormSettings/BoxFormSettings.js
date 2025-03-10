import './boxFormSettings.css';
const BoxFormSettings = ({submit, children}) => (
    <form className='box-form-settings' onSubmit={submit}>
        {children}
    </form>
);

export default BoxFormSettings;