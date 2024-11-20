import React from 'react';
import Spin from '../spin/Spin';
import './loader.css';

const Loader = ({ heigthBox, sizeSpinner, message=null }) => (
    <div className='box-loader' style={{height:heigthBox??'auto'}}>
        <div className='center-box-loader'>
            <Spin size={sizeSpinner} />
            {message && <p>{message}</p>}
        </div>
    </div>
);

export default React.memo(Loader);