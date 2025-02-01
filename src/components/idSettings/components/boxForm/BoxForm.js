import './boxForm.css';
const BoxForm = ({submit, children}) => (
    <form className='box-form' onSubmit={submit}>
        {children}
    </form>
);

export default BoxForm;