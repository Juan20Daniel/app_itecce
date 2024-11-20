import './btnTryAgain.css';
const BoxTryAgain = ({heigthBox, children}) => (
    <div className="box-try-again" style={{height:heigthBox??'auto'}}>
        <div className='box-center-btn'>
            {children}
        </div>
    </div>
);

export default BoxTryAgain;