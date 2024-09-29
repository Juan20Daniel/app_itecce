import { useRef, useState } from 'react';
import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import BoxModalLeft from '../boxModalLeft/BoxModalLeft';
import './showSelectedPersons.css';

const ShowSelectedPersons = () => {
    const [ showBack, setShowBack ] = useState(false);
    const [ isPrinting, setIsPrinting ] = useState(false);
    const componentRef = useRef();
    const promiseResolveRef = useRef(null);
    const hideStyles = useRef(false);
    return (
        <BoxModalLeft>
            <div className='show-selected-persons'>
                <Header />
                <div className='content'>
                    <Content
                        ref={componentRef}
                        showBack={showBack}
                        promiseResolveRef={promiseResolveRef}
                        isPrinting={isPrinting}
                        hideStyles={hideStyles}
                    />
                </div>
                <Footer
                    componentRef={componentRef}
                    promiseResolveRef={promiseResolveRef}
                    showBack={showBack}
                    hideStyles={hideStyles}
                    setShowBack={setShowBack}
                    setIsPrinting={setIsPrinting}
                />
            </div>
        </BoxModalLeft>
    );
}

export default ShowSelectedPersons;