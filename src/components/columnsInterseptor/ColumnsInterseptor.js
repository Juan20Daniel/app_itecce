import Spin from '../spin/Spin';
import './columnsInterseptor.css';

const ColumnsInterseptor = ({elementRef, isLoading}) => (
    <>
        <div className="interseptor" ref={elementRef} />
        {isLoading &&<div className="box-loader">
            <Spin size={40} />
        </div>}
    </>
);

export default ColumnsInterseptor;