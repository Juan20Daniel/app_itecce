import './boxModalLeft.css';
const BoxModalLeft = ({children}) => {
    const send = (e) => {
        e.preventDefault();
        console.log('submit')
    }
    return (
        <div className='box-modal-left'>
            <div className='left-box'>
                {/* <form onSubmit={send}>
                    <input />
                    <button>send</button>
                </form> */}

                {children}
            </div>
        </div>
    );
}

export default BoxModalLeft;