import Spin from '../spin/Spin';
import './interseptor.css';

const Interseptor = ({elementRef, isLoading}) => (
    <>
        <div className="interseptor" ref={elementRef} />
        {isLoading &&<div className="box-loader">
            <Spin size={40} />
        </div>}
    </>
);

export default Interseptor;