import { useContext, useRef, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { scrollToTop } from '../../helpers/helpers';
import BoxTryAgain from '../btnTryAgain/BtnTryAgain';
import ItemBox from '../itemBox/ItemBox';
import SectionContext from '../../context/Section/SectionContext';
import Interseptor from '../interseptor/Interseptor';
import Loader from '../loader/Loader';
import BtnAction from '../btnAction/BtnAction';
import NotData from '../notData/NotData';
import './homeItems.css';
const sections = {
    Alumnos:'STUDENT',
    Profesores:'TEACHER',
    Colaboradores:'COLLABORATOR'
}
const HomeItems = () => {
    const { sectionSelected } = useContext(SectionContext);
    const {data, error, isLoading, nextItems, thereAreMore, setIsLoading, requestHTTP} = useFetch();
    const interceptorRef = useRef(null);
    const showInterceptor = useRef(true);
    const sectionSelectedRef = useRef(sections[sectionSelected]);
    console.log(data);
    useEffect(() => {
        console.log(isLoading);
    },[isLoading]);
    useEffect(() => {
        if(!interceptorRef.current || error) return;
        const OnIntersection = (entries) => {
            const firstEntry = entries[0];
            if(!firstEntry.isIntersecting) return;
            requestHTTP(`/clients?type=${sectionSelectedRef.current}&offset=${nextItems.current}`, false);
        }
        const observer = new IntersectionObserver(OnIntersection);
        observer.observe(interceptorRef.current);
        return () => {
            if(observer) observer.disconnect();
        }
    },[nextItems, error, requestHTTP]);
    //Cuando cambiemos de sección, repintar los items
    useEffect(() => {
        if(!thereAreMore) {
            console.log('exce')
            console.log({thereAreMore})
            setIsLoading(false);
            showInterceptor.current = false;
        }
    },[thereAreMore, setIsLoading]);
    //Pintar los nuevos items cuando cambie de sección
    useEffect(() => {
        if(sectionSelectedRef.current !== sections[sectionSelected]) {
            sectionSelectedRef.current = sections[sectionSelected];
            requestHTTP(`/clients?type=${sections[sectionSelected]}&offset=${0}`, true);
            scrollToTop('id-home');
            showInterceptor.current = true;
        }
    },[sectionSelected, requestHTTP]);
    const tryAgain = () => {
        requestHTTP(`/clients?type=${sectionSelectedRef.current}&offset=${nextItems.current}`, false);
    }
    return (
        <div className='home-items'>
            {data.map((item, index) => (
                <ItemBox
                    key={index}
                    item={item}
                    remove={() => console.log('removing...')}
                />
            ))}
            {showInterceptor.current && <Interseptor elementRef={interceptorRef} />}
            {isLoading && <Loader sizeSpinner={35} />}
            {error && 
                <BoxTryAgain>
                    <BtnAction 
                        value='Volver a intentar'
                        color='gray'
                        action={() => tryAgain()}
                    />
                </BoxTryAgain>
            }
            {(data.length === 0 && !isLoading && !error) && 
                <NotData>
                    <p className='message-data-emty'>No se encontraron registros</p>
                </NotData>
            }
        </div>
    )
}

export default HomeItems;